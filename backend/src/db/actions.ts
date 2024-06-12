import { Router, Request, Response } from "express";
import { initDB } from "./init";
import { Database } from "sqlite3";

export const getActionDB = () => {
  const router = Router();
  initDB();
  const db = new Database(`${process.cwd()}/db/test.db`);

  router.post("/create", (req: Request, res: Response) => {
    console.log(req.body);
    db.serialize(() => {
      db.run(
        "insert into actions(name, action, path) values(?,?,?)",
        req.body.name,
        req.body.action,
        req.body.path,
      );

      db.all("select * from actions", (err1, rows) => {
        console.log(rows);
        res.send(rows);
      });
    });

    db.all("select * from actions", (err, rows) => {
      res.send(rows);
    });
  });

  router.get("/read", (req: Request, res: Response) => {
    const db = new Database(`${process.cwd()}/db/test.db`);
    db.all("select * from actions", (err, rows) => {
      res.send(rows);
    });
  });

  router.get("/update", (req: Request, res: Response) => {
    const db = new Database(`${process.cwd()}/db/test.db`);
    db.all("select * from actions", (err, rows) => {
      res.send(rows);
    });
  });

  router.get("/delete", (req: Request, res: Response) => {
    const db = new Database(`${process.cwd()}/db/test.db`);
    db.all("select * from actions", (err, rows) => {
      res.send(rows);
    });
  });

  db.close();
  return router;
};
