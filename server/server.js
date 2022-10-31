import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path'

dotenv.config()
const app = express()
const port = process.env.PORT || 5080


app.use(cors())
// app.use(express.static('server/public'))
const server = createServer(app)

const io = new Server(server,{
    cors: {
        origin : "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log(`Socket clint connect successfully ID ${socket.id}`);

    socket.on('join_room', (room) => {
        socket.join(room)
    })

    socket.on('send_message', (room, chat) => {
        
        const data = JSON.parse(readFileSync('server/db/chat.json'))
        const rooms = Object.keys(data)
        const is_room = rooms.find(data => data == room)

        if ( rooms && is_room) {
            data[is_room].push(chat)
            writeFileSync('server/db/chat.json', JSON.stringify(data))
            io.sockets.to(room).emit('receive_message', data[is_room])
        } else {
            const new_chat = {...data, [room]: [chat]}
            writeFileSync('server/db/chat.json', JSON.stringify(new_chat))
            io.sockets.to(room).emit('receive_message', new_chat[room])
        }
    })
})
if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build/'))
    app.get("*", (req, res) => {
        res.sendFile(resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

server.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`.bgCyan);
})