import { Router, Request, Response, NextFunction } from "express";
import { initDB } from "./init";
import { Database } from "sqlite3";
import bodyParser from "body-parser";
import { logger } from "../logs";

export const getGroupDB = () => {
  const router = Router();
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
  initDB();

  router.post("/create", (req: Request, res: Response) => {
    logger.groups.info('request to /groups/create')
    const db = new Database(`${process.cwd()}/db/test.db`);

    console.log(req.body);
    var status = 200;
    db.serialize(() => {
      db.run(
        "insert into groups(name, is_random) values(?,?)",
        [req.body.name, req.body.is_random],
        (error) => {
          if (error) {
            console.log(`error:${error}`);
            status = 404;
          }
        }
      );

      db.all("select * from groups", (err1, rows) => {
        return res.status(status).send(rows);
      });
    });

    db.close();
  });

  router.get("/read", (req: Request, res: Response) => {
    logger.groups.info('request to /groups/read')
    const db = new Database(`${process.cwd()}/db/test.db`);
    db.all("select * from groups", (err, rows) => {
      res.send(rows);
    });
    db.close();
  });

  router.get("/update", (req: Request, res: Response) => {
    logger.groups.info('request to /groups/update')
    const db = new Database(`${process.cwd()}/db/test.db`);
    db.all("select * from groups", (err, rows) => {
      res.send(rows);
    });
  });

  router.post("/delete", (req: Request, res: Response) => {
    logger.groups.info('request to /groups/delete')
    const db = new Database(`${process.cwd()}/db/test.db`);

    console.log(`delete ${req.body}`);
    db.serialize(() => {
      if (req.body.name != "default") {
        db.run("delete from groups where name = ?", [req.body.name]);
      }

      db.all("select * from groups", (err, rows) => {
        res.send(rows);
      });
    });
    db.close();
  });

  return router;
};
