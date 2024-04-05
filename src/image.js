const changeImage = (image) => {
  return new Promise((resolve) => {
    let opacityInt = image.style.opacity * 100;
    //フェードアウトの処理（opacityを100ミリ秒ごとに0.1づつ減らす）
    let intervalId = setInterval(() => {
      opacityInt = opacityInt + 10;
      image.style.opacity = opacityInt / 100;

      if (image.style.opacity >= 1) {
        clearInterval(intervalId);
        opacityInt = image.style.opacity * 100;
        //フェードインの処理（opacityを100ミリ秒ごとに0.1づつ増やす）
        intervalId = setInterval(() => {
          opacityInt = opacityInt - 10;
          image.style.opacity = opacityInt / 100;
          if (image.style.opacity <= 0) {
            clearInterval(intervalId);
            console.log("resolve");
            resolve();
          }
        }, 100);
      }
    }, 100);
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
const asyncTask = (image, container) => {
  return async () => {
    container.appendChild(image);
    await changeImage(image);
    container.removeChild(image)
    console.log(`タスクが完了しました`);
  };
};

const loadImage = async (src) => {
  const image = new Image();
  image.src = src;
  await image.decode();
  image.style.opacity = 0;
  return image;
};

const main = () => {
  const evtSource = new EventSource("http://127.0.0.1:3000/sse");
  const container = document.getElementById("superChatContainer");
  const imageElement = container.appendChild(new Image());
  // container.innerHTML =
  //   '<img src="https://www.sejuku.net/blog/wp-content/uploads/2017/10/voice_logo.png" alt="画像の解説文" id="targetImage">'; // ここで画像の表示などの処理を行う
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
    "message",
    (event) => {
      console.log("triggered");
      loadImage("img/image.png").then((image) => {
        asyncQueue.enqueue(asyncTask(image, container));
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
