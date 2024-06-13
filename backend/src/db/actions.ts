import { Router, Request, Response } from "express";
import { initDB } from "./init";
import { Database } from "sqlite3";
import bodyParser from "body-parser";

export const getActionDB = () => {
  const router = Router();
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());

  initDB();
  
  router.post("/create", (req: Request, res: Response) => {
    console.log(req.body);
    const db = new Database(`${process.cwd()}/db/test.db`);
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

  router.get("/delete", (req: Request, res: Response) => {
    const db = new Database(`${process.cwd()}/db/test.db`);
    db.all("select * from actions", (err, rows) => {
      res.send(rows);
    });
  });

  
  return router;
};
