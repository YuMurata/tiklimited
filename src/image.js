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
const asyncTask = (image)=> {
  return () =>
    new Promise((resolve) => {
      changeImage(image).then(() => {
        console.log(`タスクが完了しました`);
        resolve();
      });
    });
}

const main = () => {
  const evtSource = new EventSource("http://127.0.0.1:3000/sse");
  const container = document.getElementById("superChatContainer");
  container.innerHTML =
    '<img src="https://www.sejuku.net/blog/wp-content/uploads/2017/10/voice_logo.png" alt="画像の解説文" id="targetImage">'; // ここで画像の表示などの処理を行う

  const asyncQueue = new AsyncQueue();

  var image = document.getElementById("targetImage");
  image.style.opacity = 0;

  evtSource.addEventListener(
    "message",
    (event) => {
      console.log("triggered");
      asyncQueue.enqueue(asyncTask(image));
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

main()