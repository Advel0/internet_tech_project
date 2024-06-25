const express = require("express")
const app = express()
const http = require('http')
const { Server } = require("socket.io");
const cors = require("cors") // for react ot work
const b = require('../bot/bot.js')
let bot = new b.ChatBot('../bot/context.json')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
    console.log(`socket connected: ${socket.id}`);
    socket.on("send_msg", (data)=>{
        console.log("user:", data.message)
        
        let botResponse = bot.respond(data.message)
        console.log("bot:", botResponse)
        socket.emit("recieve_bot_response", {bot_message: botResponse, user_message: data.message})
    })
})

server.listen(3000, ()=>{
    console.log('listening on *:3000');
})