import { Router, Request, Response, NextFunction } from "express";
import { initDB } from "./init";
import { Database } from "sqlite3";
import bodyParser from "body-parser";
import path from "path";
import express from "express";
import fs from "fs";
import archiver from "archiver";
import moment from "moment";
import { escape } from "querystring";

const makeDownloadDir = () => {
  // 画像がuploadされるパス
  const downloadPath = path.resolve(`${process.cwd()}/downloads`);

  // downloadPathにディレクトリが存在するかどうかを確認
  if (!fs.existsSync(downloadPath)) {
    // downloadPathにディレクトリが存在しない場合、ディレクトリを作成
    fs.mkdirSync(downloadPath, { recursive: true });
  }

  var targetRemoveFiles = fs.readdirSync(downloadPath);
  console.log(targetRemoveFiles)
  for (var file of targetRemoveFiles) {
    fs.unlinkSync(`${downloadPath}/${file}`);
  }

  return downloadPath;
};

export const getEximport = () => {
  const router = Router();
  const downloadDir = makeDownloadDir();

  console.log("export eximport")

  router.get("/export", (req: Request, res: Response) => {
    
    console.log("exec export")
    const db = new Database(`${process.cwd()}/db/test.db`);
    db.all("select * from events", (err, rows) => {
      fs.writeFileSync(`${downloadDir}/events.json`, JSON.stringify(rows));
    });
    db.all("select * from actions", (err, rows) => {
      fs.writeFileSync(`${downloadDir}/actions.json`, JSON.stringify(rows));
    });
    db.close();
    
    
    const fileName = `${moment().format("YYYY-MMDD-HHmm")}-export.zip`;
    // ストリームを生成して、archiverと紐付ける
    var archive = archiver.create("zip", {});

    const downloadPath = `${downloadDir}/${fileName}`;
    var output = fs.createWriteStream(downloadPath);
    archive.pipe(output);

    const uploadDir = path.resolve(`${process.cwd()}/uploads`);
    archive.glob(`uploads/*`);
    archive.glob(`downloads/*.json`);
    console.log(`downloads/*.json`)

    // zip圧縮実行
    archive.finalize();
    output.on("close", function () {
      // zip圧縮完了すると発火する
      var archive_size = archive.pointer();
      console.log(`complete! total size : ${archive_size} bytes`);

      res.download(downloadPath);
    });
  });


  return router;
};
