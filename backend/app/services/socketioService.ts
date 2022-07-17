import EventType from "@app/enums/EventType";
import { SocketIO } from "@app/helpers/socketioHelper";
import { Socket } from 'socket.io';
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

export async function bootstrapSocketIoService(socketio: SocketIO){
    const io = socketio;

    const pubClient = createClient({ url: "redis://redis-service:6379" });
    const subClient = pubClient.duplicate();
    await pubClient.connect();
    await subClient.connect();
    
    io.adapter(createAdapter(pubClient, subClient));

    const roomNamespace = io.of("/socket/rooms");

    roomNamespace.on(EventType.CONNECTION, (socket: typeof Socket) => {
        socket.on(EventType.ROOM.USER.CONNECTED, function(data: any){
            socket.join(data.room_uuid); console.log('joined', data)
        });

        socket.on(EventType.ROOM.MESSAGE.SENT, async function(data: any){ console.log('sender', data)
            const msg = {
                uuid: Date.now(),
                text: data.text,
                member_uuid: data.sender,
                room_uuid: data.room,
                owner: data.sender,
                port: process.env.port
            };
            roomNamespace.in(data.room).emit(EventType.ROOM.MESSAGE.RECEIVED, msg);
        });
    })
};