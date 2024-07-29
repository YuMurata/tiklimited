import { Router, Request, Response } from "express";
import { WebcastPushConnection } from "tiktok-live-connector";
import bodyParser from "body-parser";
import { notifyEmitter } from "./sse";
import { InvalidatedProjectKind } from "typescript";
import { Database } from "sqlite3";

type GiftURL = {
  name: string;
  imageURL: string;
};

export const getTiktok = () => {
  const router = Router();
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());

  const connectRetry = 10;

  var tiktokLiveSession: WebcastPushConnection | null = null;
  var giftURLs: GiftURL[] = [];

  router.get("/status", (req: Request, res: Response) => {
    res.send(tiktokLiveSession?.getState());
  });

  router.post("/connect", (req: Request, res: Response) => {
    console.log(req.body);
    const tiktokID = req.body.tiktokID;

    tiktokLiveSession?.disconnect();

    // Create a new wrapper object and pass the username
    tiktokLiveSession = new WebcastPushConnection(tiktokID, {
      enableExtendedGiftInfo: true,
    });

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

    tiktokLiveSession
      .getAvailableGifts()
      .then((giftList) => {
        giftURLs = giftList.map((gift: any): GiftURL => {
          return {
            name: gift.name,
            imageURL: `https://p16-webcast.tiktokcdn.com/img/maliva/${gift.image.uri}~tplv-obj.webp`,
          };
        });
        console.log(giftURLs);
        // giftList.forEach((gift:any) => {
        //   console.log(
        //     `id: ${gift.id}, name: ${gift.name}, cost: ${gift.diamond_count}`
        //   );
        // });
      })
      .catch((err) => {
        console.error(err);
      });

    // Define the events that you want to handle
    // In this case we listen to chat messages (comments)
    tiktokLiveSession.on("chat", (data) => {
      // console.log(
      //   `chat: ${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`
      // );
      // notifyEmitter.emit(
      //   "chat",
      //   JSON.stringify({
      //     user: data.uniqueId,
      //     data: [{ action: "video", path: "video/sample6.webm" }],
      //   })
      // );
    });

    // And here we receive gifts sent to the streamer
    tiktokLiveSession.on("gift", (data) => {
      const giftName = data.extendedGiftInfo.name;
      console.log(
        `gift: ${data.uniqueId} (userId:${data.userId}) sends ${giftName}`
      );

      const db = new Database(`${process.cwd()}/db/test.db`);
      db.serialize(() => {
        const sql =
          "select actions.action,actions.path,events.group_name,groups.is_random from actions inner join events on actions.name = events.action inner join groups on events.group_name = groups.name where trigger = ?";
        type DBParam = {
          action: string;
          path: string;
          group_name: string;
          is_random: boolean;
        };

        type groupedAction = {
          name: string;
          actions: DBParam[];
          isRandom: boolean;
        };

        db.all(sql, [giftName], (err: Error, rows: DBParam[]) => {
          console.log(rows);

          const groupNames = [
            ...new Set(
              rows.map((x) => {
                return x.group_name;
              })
            ),
          ];

          const groups: groupedAction[] = groupNames.map((groupName) => {
            return {
              name: groupName,
              actions: rows.filter((data) => {
                return data.group_name == groupName;
              }),
              isRandom: false,
            };
          });

          for (const groupedData of groups) {
            groupedData["isRandom"] = groupedData.actions[0].is_random;
          }

          groups.forEach((groupedData) => {
            if (groupedData.isRandom) {
              const action = groupedData.actions[Math.floor(Math.random()*groupedData.actions.length)]
              notifyEmitter.emit(
                "chat",
                JSON.stringify({
                  user: data.uniqueId,
                  data: [{ action: action.action, path: action.path }],
                })
              );
            } else {
              groupedData.actions.forEach((action) => {
                notifyEmitter.emit(
                  "chat",
                  JSON.stringify({
                    user: data.uniqueId,
                    data: [{ action: action.action, path: action.path }],
                  })
                );
              });
            }
          });
        });
      });

      db.close();
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
