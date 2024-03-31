const { WebcastPushConnection } = require('tiktok-live-connector');

// Username of someone who is currently live
let tiktokUsername = "20103040n";

// Create a new wrapper object and pass the username
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

// Connect to the chat (await can be used as well)
tiktokLiveConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
})

// Define the events that you want to handle
// In this case we listen to chat messages (comments)
tiktokLiveConnection.on('chat', data => {
    console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
})

// And here we receive gifts sent to the streamer
tiktokLiveConnection.on('gift', data => {
    console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
})

var http = require('http'),
port = 3000,//ポート番号
ipadress = 'localhost',//IPアドレス
fs = require('fs');


var server = http.createServer();

server.on('request', function (req, res) {
    fs.readFile(__dirname + '/index.html', 'utf-8', function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write("not found!");
            return res.end();
        }
        var url = req.url;
        console.log("url: "+url);
        if (url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            // res.writeHead(200, { 'Content-Type': 'application/javascript' });
            // res.writeHead(200);
            res.write(data);
            console.log("root");
            return res.end();
        }
        else if (url === '/image.js') {
            fs.readFile(__dirname + '/image.js', 'utf-8', function (err, data) {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.write("not found!");
                    return res.end();
                }

                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.write(data);
                console.log("image");
                res.end();
            });
        }
    });
});

server.listen(port, ipadress);
console.log("server listening ...");

// ...and more events described in the documentation below