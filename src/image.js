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
    const container = document.getElementById('superChatContainer');
    var d = new Date()
    container.innerHTML = '<img src="https://www.sejuku.net/blog/wp-content/uploads/2017/10/voice_logo.png" alt="画像の解説文" id="targetImage">'; // ここで画像の表示などの処理を行う

    var image = document.getElementById('targetImage');
    changeImage(image);
    console.log("disp");
}

function changeImage(image){

    if(image.style.opacity == ''){
      image.style.opacity = 1;
    }
  
    let opacityInt = image.style.opacity * 100;
    //フェードアウトの処理（opacityを100ミリ秒ごとに0.1づつ減らす）
    let intervalId = setInterval( () => {
      opacityInt = opacityInt - 10;
      image.style.opacity = opacityInt / 100;
  
      if(image.style.opacity <= 0){
        clearInterval(intervalId);
        opacityInt = image.style.opacity * 100;
        //フェードインの処理（opacityを100ミリ秒ごとに0.1づつ増やす）
        intervalId = setInterval( () => {
          opacityInt = opacityInt + 10;
          image.style.opacity = opacityInt / 100;
          if(image.style.opacity >= 1){
            clearInterval(intervalId);
          }
        }, 100);
      }
    }, 100);
  }

setInterval(displaySuperChat, 1000); // 10秒ごとにスパチャを取得

// const container = document.getElementById('superChatContainer');
// container.innerHTML = "Hello world!!"; // ここで画像の表示などの処理を行う
