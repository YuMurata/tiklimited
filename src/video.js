const playVideo = (video) => {
  return new Promise((resolve) => {
    video.addEventListener("ended",()=>{
      console.log("resolve");
      resolve();      
    })
    console.log("play")
    video.play()
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
  const evtSource = new EventSource("http://127.0.0.1:3000/sse");
  const container = document.getElementById("superChatContainer");
  // container.innerHTML =
  //   '<img src="https://www.sejuku.net/blog/wp-content/uploads/2017/10/voice_logo.png" alt="画像の解説文" id="targetvideo">'; // ここで画像の表示などの処理を行う
  // container.innerHTML =
  //   '<img src="img/image.png" alt="画像の解説文" id="targetImage">'; // ここで画像の表示などの処理を行う
  const asyncQueue = new AsyncQueue();

  // const image = new Image();
  // image.src = "img/image.png";
  // image.decode().then(() => {
  //   container.appendChild(image);
  // });
  // console.log("63");

  // var image = document.getElementById("targetImage");
  // loadImage("image.png").then(() => {
  //   console.log("load image");
  // });
  // image.style.opacity = 0;

  evtSource.addEventListener(
    "chat",
    (event) => {
      const data = JSON.parse(event.data);

      console.log(`triggered: ${JSON.stringify(data)}`);
      const filterdDatas = data.data.filter((x) => {
        return x.action === "video";
      });
      console.log(`filtered: ${JSON.stringify(filterdDatas)}`);
      filterdDatas.forEach((filterdData) => {
        loadVideo(filterdData.path).then((video) => {
          console.log(`${data.user} send gift`);
          asyncQueue.enqueue(asyncTask(video, container));
        });
      });
      // container.innerHTML += data.user;
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
