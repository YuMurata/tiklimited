import { Router, Request, Response } from "express";
import { initDB } from "./init";
import { Database } from "sqlite3";
import bodyParser from "body-parser";

export const getActionDB = () => {
  const router = Router();
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());

  const table = "actions";

  initDB();

  router.post("/create", (req: Request, res: Response) => {
    console.log(req.body);
    const db = new Database(`${process.cwd()}/db/test.db`);
    db.serialize(() => {
      db.run(
        `insert into ${table}(name, action, path) values(?,?,?)`,
        req.body.name,
        req.body.action,
        req.body.path
      );

      db.all("select * from actions", (err1, rows) => {
        console.log(rows);
        res.send(rows);
      });
    });

    db.close();
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

  router.post("/delete", (req: Request, res: Response) => {
    const db = new Database(`${process.cwd()}/db/test.db`);

    console.log(`delete ${req.body}`);
    db.serialize(() => {
      db.run(`delete from ${table} where name = ?`, req.body.name);

      db.all(`select * from ${table}`, (err, rows) => {
        res.send(rows);
      });
    });
    db.close();
  });

  return router;
};
