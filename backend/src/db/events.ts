import { Router, Request, Response } from "express";
import { initDB } from "./init";
import { Database } from "sqlite3";

export const getEventDB = () => {
  const router = Router();
  initDB();

  router.post("/create", (req: Request, res: Response) => {
    const db = new Database(`${process.cwd()}/db/test.db`);

    console.log(req.body);
    db.serialize(() => {
      db.run(
        "insert into events(trigger, action) values(?,?)",
        "gift",
        "play video"
      );

      db.all("select * from events", (err1, rows) => {
        console.log(rows);
        res.send("ok");
      });
    });
    db.close();

    db.all("select * from events", (err, rows) => {
      res.send(rows);
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

  router.get("/delete", (req: Request, res: Response) => {
    const db = new Database(`${process.cwd()}/db/test.db`);
    db.all("select * from events", (err, rows) => {
      res.send(rows);
    });
  });

  return router;
};
