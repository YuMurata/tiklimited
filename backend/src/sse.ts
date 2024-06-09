import { Router, Request, Response } from "express";
import EventEmitter from "events";

export const notifyEmitter = new EventEmitter();

export const getSSE = () => {
  const router = Router();

  router.get("/", (req: Request, res: Response) => {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no", // disable nginx proxy buffering
    });

    function myevent(d: any) {
      res.write(`data: ${d}\n\n`);
    }
    notifyEmitter.on("myevent", myevent);

    const chatEvent = (data: any) => {
      res.write(`event: chat\n`);
      res.write(`data: ${data}\n\n`);
      console.log("send chat event");
    };

    notifyEmitter.on("chat", chatEvent);
    req.on("close", function () {
      notifyEmitter.removeListener("myevent", myevent);
      notifyEmitter.removeListener("chat", chatEvent);
      return res.end()
    });

    console.log("add event");
  });

  return router
};
