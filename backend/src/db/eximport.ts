import { Router, Request, Response } from "express";
import { Database } from "sqlite3";
import path from "path";
import express from "express";
import fs from "fs";
import archiver from "archiver";
import moment from "moment";
import upload from "./multerHandler";
import AdmZip from "adm-zip";
import { logger } from "../logs";

const rmDir = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  // file or dir
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const deleteTarget = path.join(dirPath, item);
    if (fs.lstatSync(deleteTarget).isDirectory()) {
      rmDir(deleteTarget);
    } else {
      fs.unlinkSync(deleteTarget);
    }
  }
  fs.rmdirSync(dirPath);
};

const makeExportDir = () => {
  // 画像がuploadされるパス
  const exportPath = path.resolve(`${process.cwd()}/tmp/export`);

  // exportPathにディレクトリが存在するかどうかを確認
  if (fs.existsSync(exportPath)) {
    rmDir(exportPath);
  }
  fs.mkdirSync(exportPath, { recursive: true });

  return exportPath;
};

const makeImportDir = () => {
  // 画像がuploadされるパス
  const exportPath = path.resolve(`${process.cwd()}/tmp/import`);

  // exportPathにディレクトリが存在するかどうかを確認
  if (fs.existsSync(exportPath)) {
    rmDir(exportPath);
  }

  return exportPath;
};

export const getEximport = () => {
  const router = Router();
  const exportDir = makeExportDir();
  const importDir = makeImportDir();

  router.get("/export", async (req: Request, res: Response) => {
    logger.eximport.info('request to /eximport/export')

    const uniqueSuffix = Math.random().toString(26).substring(4, 10);

    const targetDir = path.resolve(
      `${exportDir}/${moment().format("YYYY-MMDD-HHmm")}-${uniqueSuffix}`
    );
    fs.mkdirSync(targetDir, { recursive: true });

    const db = new Database(`${process.cwd()}/db/test.db`);

    const getDBNames = async () => {
      return new Promise<string[]>((resolve) => {
        db.all(
          "select name from sqlite_master where type='table'",
          (err, tables: { name: string }[]) => {
            resolve(
              tables.map((table) => {
                return table.name;
              })
            );
          }
        );
      });
    };

    const DBNames = await getDBNames();

    const writeDBData = async (DBName: string) => {
      return new Promise<void>((resolve) => {
        db.all(`select * from ${DBName}`, (err, rows) => {
          console.log(DBName);
          fs.writeFileSync(`${targetDir}/${DBName}.json`, JSON.stringify(rows));
          resolve();
        });
      });
    };

    await Promise.all(
      DBNames.map((DBName) => {
        return writeDBData(DBName);
      })
    );
    db.close();

    const fileName = `${moment().format("YYYY-MMDD-HHmm")}-export.zip`;
    // ストリームを生成して、archiverと紐付ける
    var archive = archiver.create("zip", {});

    const exportPath = `${exportDir}/${fileName}`;
    var output = fs.createWriteStream(exportPath);
    archive.pipe(output);

    const uploadDir = path.resolve(`${process.cwd()}/uploads`);
    archive.directory("uploads", "uploads");
    archive.directory(`${path.relative(process.cwd(), targetDir)}`, "DB");
    console.log(`${fs.readdirSync(path.relative(process.cwd(), targetDir))}`);

    // zip圧縮実行
    archive.finalize();
    output.on("close", function () {
      // zip圧縮完了すると発火する
      var archive_size = archive.pointer();
      console.log(`complete! total size : ${archive_size} bytes`);

      res.download(exportPath);
    });
  });

  router.post(
    "/import",
    upload.single("file"),
    async (req: express.Request, res: express.Response) => {
      logger.eximport.info('request to /eximport/import')
      if (req.file) {
        console.log("exec import");

        const uniqueSuffix = Math.random().toString(26).substring(4, 10);

        const extractPath = path.resolve(
          `${importDir}/${moment().format("YYYY-MMDD-HHmm")}-${uniqueSuffix}`
        );

        const unarchiveFiles = (file: Express.Multer.File) => {
          const zip = new AdmZip(path.resolve(`${importDir}/${file.filename}`));

          // extractPathにディレクトリが存在するかどうかを確認
          if (!fs.existsSync(extractPath)) {
            // extractPathにディレクトリが存在しない場合、ディレクトリを作成
            fs.mkdirSync(extractPath, { recursive: true });
          }
          console.log(extractPath);
          zip.extractAllTo(extractPath, true);
        };

        const copyUploads = () => {
          for (const file of fs.readdirSync(`${extractPath}/uploads/`)) {
            fs.copyFileSync(
              `${extractPath}/uploads/${file}`,
              `${process.cwd()}/uploads/${file}`
            );
          }
        };

        const updateActions = async () => {
          const actionsDatas = JSON.parse(
            fs.readFileSync(`${extractPath}/DB/actions.json`, "utf8")
          );

          return new Promise((resolve) => {
            const db = new Database(`${process.cwd()}/db/test.db`);
            db.serialize(() => {
              for (const actionsData of actionsDatas) {
                db.run(
                  `replace into actions(name, action, path) values(?,?,?)`,
                  [actionsData.name, actionsData.action, actionsData.path]
                );
              }
              db.all("select * from actions", (err1, rows) => {
                return resolve(rows);
              });
            });
            db.close();
          });
        };

        const updateEvents = async () => {
          const eventsDatas = JSON.parse(
            fs.readFileSync(`${extractPath}/DB/events.json`, "utf8")
          );

          return new Promise((resolve) => {
            const db = new Database(`${process.cwd()}/db/test.db`);
            db.serialize(() => {
              for (const eventsData of eventsDatas) {
                db.run(`replace into events(trigger, action) values(?,?)`, [
                  eventsData.trigger,
                  eventsData.action,
                ]);
              }
              db.all("select * from events", (err1, rows) => {
                return resolve(rows);
              });
            });
            db.close();
          });
        };

        type GroupsColumn = {
          name: string;
          is_random: boolean;
        };
        const updateGroups = async () => {
          const DBName = "groups";
          const datas: GroupsColumn[] = JSON.parse(
            fs.readFileSync(`${extractPath}/DB/${DBName}.json`, "utf8")
          );

          return new Promise((resolve) => {
            const db = new Database(`${process.cwd()}/db/test.db`);
            db.serialize(() => {
              for (const data of datas) {
                db.run(`replace into ${DBName}(name, is_random) values(?,?)`, [
                  data.name,
                  data.is_random,
                ]);
              }
              db.all("select * from events", (err1, rows) => {
                return resolve(rows);
              });
            });
            db.close();
          });
        };

        unarchiveFiles(req.file);
        copyUploads();
        const actions = await updateActions();
        const events = await updateEvents();
        const groups = await updateGroups();

        console.log("req.file", req.file);
        console.log("req.body", req.body);
        res.send({ actions: actions, events: events, groups: groups });
      } else {
        res.status(500).send("import failed");
      }
    }
  );

  return router;
};
