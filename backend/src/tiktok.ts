import { Router, Request, Response } from "express";
import { WebcastPushConnection } from "tiktok-live-connector";
import bodyParser from "body-parser";
import { notifyEmitter } from "./sse";
import { InvalidatedProjectKind } from "typescript";

export const getTiktok = () => {
  const router = Router();
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());

  const connectRetry = 10;

  var tiktokLiveSession: WebcastPushConnection | null = null;

  router.get("/status", (req: Request, res: Response) => {
    res.send(tiktokLiveSession?.getState());
  });

  router.post("/connect", (req: Request, res: Response) => {
    console.log(req.body);
    const tiktokID = req.body.tiktokID;

    tiktokLiveSession?.disconnect();

    // Create a new wrapper object and pass the username
    tiktokLiveSession = new WebcastPushConnection(tiktokID);

    // Connect to the chat (await can be used as well)
    tiktokLiveSession
      .connect()
      .then((state) => {
        console.info(`Connected to roomId ${state.roomId}`);
        return res.status(200).send({ connected: tiktokID });
      })
      .catch((err: Error) => {
        console.error("Failed to connect", err);
        return res.status(500).send("Failed to connect");
      });

    // Define the events that you want to handle
    // In this case we listen to chat messages (comments)
    tiktokLiveSession.on("chat", (data) => {
      console.log(
        `chat: ${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`
      );

      notifyEmitter.emit(
        "chat",
        JSON.stringify({
          user: data.uniqueId,
          data: [{ action: "video", path: "video/sample6.webm" }],
        })
      );
    });

    // And here we receive gifts sent to the streamer
    tiktokLiveSession.on("gift", (data) => {
      console.log(
        `gift: ${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`
      );

      //   console.log(`gift: ${JSON.stringify(dbEvents.gift)}`);
      //   dbEvents.gift.forEach((x) => {
      notifyEmitter.emit(
        "chat",
        JSON.stringify({
          user: data.uniqueId,
          data: [{ action: "video", path: "video/sample6.webm" }],
        })
      );
    });
  });

  router.post("/disconnect", (req: Request, res: Response) => {
    console.log("disconnect");

    tiktokLiveSession?.disconnect();
    tiktokLiveSession = null;
    return res.status(200).send("ok");
  });

  return router;
};
