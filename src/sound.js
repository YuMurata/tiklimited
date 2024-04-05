// script.js
// const API_KEY = 'YOUR_YOUTUBE_API_KEY';
// const CHANNEL_ID = 'YOUR_YOUTUBE_CHANNEL_ID';

// function getSuperChats() {
//     // const url = `https://www.googleapis.com/youtube/v3/superChatEvents?part=snippet&liveChatId=${CHANNEL_ID}&key=${API_KEY}`;

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             if (data.items && data.items.length > 0) {
//                 const message = data.items[0].snippet.displayMessage;
//                 displaySuperChat(message);
//             }
//         })
//         .catch(error => console.error('Error fetching super chat:', error));
// }

function displaySuperChat() {
  const container = document.getElementById("superChatContainer");
  const audio = new Audio("sound.mp3");
  audio.preload = "metadata";
  audio.load();
  if (audio.readyState === 4) {
    audio.play();
  } else {
    // 再生可能状態でなければ再生可能状態になった時のイベント通知をセットします
    audio.addEventListener('canplaythrough', function (e) {
      audio.removeEventListener('canplaythrough', arguments.callee);
      audio.play();
      console.log(audio.duration);
    });
  }
  // console.log("play");
}

setInterval(displaySuperChat, 1000); // 10秒ごとにスパチャを取得
// displaySuperChat()
// const container = document.getElementById('superChatContainer');
// container.innerHTML = "Hello world!!"; // ここで画像の表示などの処理を行う
