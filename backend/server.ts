import express from "express";

const app: express.Express = express();
const port = 8000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!");
});

/* ↓これ追加 */
app.get("/api", (req: express.Request, res: express.Response) => {
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
