import { Database, sqlite3 } from "sqlite3";
import fs from "fs";

export const initDB = () => {
  fs.mkdirSync(`${process.cwd()}/db`, { recursive: true });
  const db = new Database(`${process.cwd()}/db/test.db`);

  db.serialize(() => {
    db.run(
      "create table if not exists actions(name text primary key, action text, path text)"
    );
    db.run(
      "create table if not exists events(trigger text, action text, group_name text, primary key(trigger, action))"
    );
    db.run(
      "create table if not exists groups(name text primary key, is_random boolean)"
    );
    db.run(`insert or ignore into groups(name, is_random) values(?,?)`, [
      "default",
      false,
    ]);
  });
  db.close();
};
