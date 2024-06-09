import { Router, Request, Response } from "express";
import { WebcastPushConnection } from "tiktok-live-connector";
import bodyParser from "body-parser";
import { disconnect } from "process";

export const getTiktok = () => {
  const router = Router();
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());

  var tiktokLiveSession: WebcastPushConnection | null = null;

  router.post("/connect", (req: Request, res: Response) => {
    console.log(req.body);
    const tiktokID = req.body.tiktokID;

    tiktokLiveSession?.disconnect();

    // Create a new wrapper object and pass the username
    const tiktokLiveConnection = new WebcastPushConnection(tiktokID);

    // Connect to the chat (await can be used as well)
    tiktokLiveConnection
      .connect()
      .then((state) => {
        console.info(`Connected to roomId ${state.roomId}`);
        return res.status(200).send({ connected: tiktokID });
      })
      .catch((err) => {
        console.error("Failed to connect", err);
        return res.status(500).send("Failed to connect");
      });
    // Define the events that you want to handle
    // In this case we listen to chat messages (comments)
    tiktokLiveConnection.on("chat", (data) => {
      console.log(
        `chat: ${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`
      );
    });

    // And here we receive gifts sent to the streamer
    tiktokLiveConnection.on("gift", (data) => {
      console.log(
        `gift: ${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`
      );

      //   console.log(`gift: ${JSON.stringify(dbEvents.gift)}`);
      //   dbEvents.gift.forEach((x) => {
      //     notifyEmitter.emit(
      //       "chat",
      //       JSON.stringify({ user: data.uniqueId, data: dbEvents.gift })
      //     );
      //   });
    });
    
    tiktokLiveSession = tiktokLiveConnection;
  });

  router.post("/disconnect", (req: Request, res: Response) => {
    console.log("disconnect");

    tiktokLiveSession?.disconnect();
    tiktokLiveSession = null
    return res.status(200).send("ok")
  });

  return router;
};
