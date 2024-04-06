const events = require("events");
const notifyEmitter = new events.EventEmitter();

const openServer = () => {
  const retNotFound = (res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("not found!");
    return res.end();
  };

  const readContent = (err, data, url, res, contentType) => {
    if (err) {
      return retNotFound(res);
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.write(data);
      console.log(`write: ${url}`);
      return res.end();
    }
  };

  const http = require("http"),
    port = 3000, //ポート番号
    ipadress = "localhost", //IPアドレス
    fs = require("fs");

  const server = http.createServer();

  const util = require("node:util");

  // setInterval(function () {
  //   const len = notifyEmitter.listeners("myevent").length;
  //   util.log(JSON.stringify(["listeners.length", len]));
  //   if (len > 0) {
  //     notifyEmitter.emit("myevent", "interval!");
  //     util.log(JSON.stringify(["emit myevent"]));
  //   }
  // }, 1000);

  server.on("request", function (req, res) {
    const url = req.url;
    console.log("url: " + url);

    if (url === "/") {
      fs.readFile(__dirname + "/index.html", "utf-8", function (err, data) {
        readContent(err, data, url, res, "text/html");
      });
    } else if (url === "/sse") {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no", // disable nginx proxy buffering
      });

      function myevent(d) {
        res.write(`data: ${d}\n\n`);
      }
      notifyEmitter.on("myevent", myevent);
      notifyEmitter.on("chat", (data) => {
        res.write(`event: chat\n`);
        res.write(`data: ${data}\n\n`);
        console.log("send chat event");
      });
      req.on("close", function () {
        notifyEmitter.removeListener("myevent", myevent);
      });

      console.log("add event");

      // return res.end();
    } else if (url.includes(".js")) {
      fs.readFile(__dirname + url, "utf-8", function (err, data) {
        readContent(err, data, url, res, "text/javascript");
      });
    } else if (url.includes(".mp3")) {
      fs.readFile(__dirname + url, function (err, data) {
        readContent(err, data, url, res, "audio/mp3");
      });
    } else if (url.includes(".wav")) {
      fs.readFile(__dirname + url, function (err, data) {
        readContent(err, data, url, res, "audio/wav");
      });
    } else if (url.includes(".png")) {
      res.writeHead(200, { "Content-Type": "image/png; charset=utf-8" });
      fs.readFile(__dirname + url, "binary", function (err, data) {
        if (err) {
          console.log(url);
          return retNotFound(res);
        } else {
          res.write(data, "binary");
          return res.end();
        }
      });
    } else {
      console.log("not match");
    }
  });

  server.listen(port, ipadress);
  console.log("server listening ...");
};

const connectTiktok = () => {
  const { mainModule } = require("process");
  const { WebcastPushConnection } = require("tiktok-live-connector");

  // Username of someone who is currently live
  let tiktokUsername = "karenfrez";

  // Create a new wrapper object and pass the username
  let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

  // Connect to the chat (await can be used as well)
  tiktokLiveConnection
    .connect()
    .then((state) => {
      console.info(`Connected to roomId ${state.roomId}`);
    })
    .catch((err) => {
      console.error("Failed to connect", err);
    });

  // Define the events that you want to handle
  // In this case we listen to chat messages (comments)
  tiktokLiveConnection.on("chat", (data) => {
    // console.log(
    //   `${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`
    // );
  });

  // And here we receive gifts sent to the streamer
  tiktokLiveConnection.on("gift", (data) => {
    console.log(
      `${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`
    );
    notifyEmitter.emit(
      "chat",
      JSON.stringify({ user: data.uniqueId, data: "img/image.png" })
    );
  });
};

function main() {
  connectTiktok();
  openServer();

  // ...and more events described in the documentation below
}

main();
