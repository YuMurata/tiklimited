const playVideo = (video) => {
  return new Promise((resolve) => {
    video.addEventListener("ended", () => {
      console.log("resolve");
      resolve();
    });
    console.log("play");
    video.play();
  });
};

class AsyncQueue {
  constructor() {
    this.tasks = Promise.resolve();
  }

  // 非同期タスクを追加
  enqueue(task) {
    this.tasks = this.tasks.then(() => task());
  }
}

// 非同期タスクの例
const asyncTask = (video, container) => {
  return async () => {
    container.appendChild(video);
    await playVideo(video);
    container.removeChild(video);
    console.log(`タスクが完了しました`);
  };
};

const loadVideo = async (src) => {
  var video = document.createElement("video");
  video.setAttribute("src", src);
  return video;
};

const main = () => {
  const evtSource = new EventSource("/sse");
  const container = document.getElementById("superChatContainer");
  const asyncQueue = new AsyncQueue();

  evtSource.addEventListener(
    "chat",
    (event) => {
      const data = JSON.parse(event.data);

      console.log(`triggered: ${JSON.stringify(data)}`);
      console.log(`row_data: ${data}`);
      const filterdDatas = data.data.filter((x) => {
        return x.action === "video";
      });
      console.log(`filtered: ${JSON.stringify(filterdDatas)}`);
      filterdDatas.forEach((filterdData) => {
        loadVideo(`storage/${filterdData.path}`).then((video) => {
          console.log(`${data.user} send gift`);
          asyncQueue.enqueue(asyncTask(video, container));
        });
      });
    },
    false
  );

  evtSource.onopen = function (event) {
    console.log(`sse open`);
  };

  evtSource.onerror = function (event) {
    console.log(`sse error: ${event.message}`);
  };

  console.log("add event");
};

main();
