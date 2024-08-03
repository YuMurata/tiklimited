const { mainModule } = require("process");
const { WebcastPushConnection } = require("tiktok-live-connector");

// Username of someone who is currently live
let tiktokUsername = "20103040n";

// Create a new wrapper object and pass the username
let tiktokLiveSession = new WebcastPushConnection(tiktokUsername);
tiktokLiveSession
  .getAvailableGifts()
  .then((giftList) => {
    giftURLs = giftList.map((gift) => {
      return {
        name: gift.name,
        imageURL: `https://p16-webcast.tiktokcdn.com/img/maliva/${gift.image.uri}~tplv-obj.webp`,
      };
    });
    // console.log(giftURLs);
    giftList.forEach((gift) => {
      console.log(
        `id: ${gift.id}, name: ${gift.name}, cost: ${gift.diamond_count}`
      );
    });
    console.log("--- filter ---");
    giftList
      .filter((x) => {
        return x.diamond_count == 44999;
      })
      .forEach((gift) => {
        console.log(
          `id: ${gift.id}, name: ${gift.name}, cost: ${gift.diamond_count}`
        );
      });
  })
  .catch((err) => {
    console.error(err);
  });
// Connect to the chat (await can be used as well)
// tiktokLiveConnection
//   .connect()
//   .then((state) => {
//     console.info(`Connected to roomId ${state.roomId}`);
//   })
//   .catch((err) => {
//     console.error("Failed to connect", err);
//   });

// // Define the events that you want to handle
// // In this case we listen to chat messages (comments)
// tiktokLiveConnection.on("chat", (data) => {
//   console.log(
//     `${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`
//   );
// });

// // And here we receive gifts sent to the streamer
// tiktokLiveConnection.on("gift", (data) => {
//   console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
// });
