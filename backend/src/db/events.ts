import { Router, Request, Response, NextFunction } from "express";
import { initDB } from "./init";
import { Database } from "sqlite3";
import bodyParser from "body-parser";

export const getEventDB = () => {
  const router = Router();
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
  initDB();

  router.post("/create", (req: Request, res: Response) => {
    const db = new Database(`${process.cwd()}/db/test.db`);

    console.log(req.body);
    var status = 200;
    db.serialize(() => {
      db.run(
        "insert into events(trigger, action) values(?,?)",
        [req.body.trigger, req.body.action],
        (error) => {
          if (error) {
            console.log(`error:${error}`);
            status = 404;
          }
        }
      );

      db.all("select * from events", (err1, rows) => {
        return res.status(status).send(rows);
      });
    });

    db.close();
  });

  router.get("/read", (req: Request, res: Response) => {
    const db = new Database(`${process.cwd()}/db/test.db`);
    db.all("select * from events", (err, rows) => {
      res.send(rows);
    });
    db.close();
  });

  router.get("/update", (req: Request, res: Response) => {
    const db = new Database(`${process.cwd()}/db/test.db`);
    db.all("select * from events", (err, rows) => {
      res.send(rows);
    });
  });

  router.post("/delete", (req: Request, res: Response) => {
    const db = new Database(`${process.cwd()}/db/test.db`);

    console.log(`delete ${req.body}`);
    db.serialize(() => {
      db.run(
        "delete from events where trigger = ? and action = ?",
        req.body.trigger,
        req.body.action
      );

      db.all("select * from events", (err, rows) => {
        res.send(rows);
      });
    });
    db.close();
  });

  return router;
};
