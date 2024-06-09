import express from "express";
import { getEventDB } from "./src/db/events";
import { getSSE } from "./src/sse";
import { getTiktok } from "./src/tiktok";

import { WebcastPushConnection } from "tiktok-live-connector";
import bodyParser from "body-parser";

const app: express.Express = express();
const port = 8000;

app.use(express.static("public"));
app.use("/db/events", getEventDB());
app.use("/sse", getSSE());
app.use("/tiktok", getTiktok());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!");
});

app.get("/screen", (req: express.Request, res: express.Response) => {
  res.sendFile(__dirname + "/public/screen.html");
});

/* ↓これ追加 */
app.get("/db/read", (req: express.Request, res: express.Response) => {
  res.json([
    {
      id: 1,
      event: "gift/Rose",
      action: "play video",
      name: "play video 1",
      path: "video/test.mp4",
    },
  ]);
});

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});
