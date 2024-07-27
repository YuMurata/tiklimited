import express from "express";
import { getEventDB } from "./src/db/events";
import { getSSE } from "./src/sse";
import { getTiktok } from "./src/tiktok";
import bodyParser from "body-parser";
import { getActionDB } from "./src/db/actions";
import { getUpload } from "./src/upload/upload";
import { getEximport } from "./src/db/eximport";
import { getGroupDB } from "./src/db/groups";

const app: express.Express = express();
const port = 8000;

app.use(express.static("public"));
app.use("/db/events", getEventDB());
app.use("/db/actions", getActionDB());
app.use("/db/groups", getGroupDB());
app.use("/sse", getSSE());
app.use("/tiktok", getTiktok());
app.use("/upload", getUpload());
app.use("/eximport", getEximport());
app.use("/storage", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
