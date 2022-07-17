import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import app_config from "../config/app_config";
import EventType from '../enums/EventType';

interface Context {
    socket: Socket;
    memberUUID?: string | number;
    setMemberUUID: Function;
    roomUUID?: string;
    setRoomUUID: Function;
    messages?: any;
    setMessages: Function;
}
const socket = io(`ws://localhost:8000/socket/rooms`, {
    transports: [ "websocket" ]
});

const SocketContext = createContext<Context>({
    socket,
    setMemberUUID: () => false,
    setRoomUUID: () => false,
    setMessages: () => false,
    roomUUID: 'default-chat-room',
    memberUUID: Date.now(),
    messages: []
});

function SocketsProvider(props: any) {
    const [memberUUID, setMemberUUID] = useState<string | number>(Date.now());
    const [roomUUID, setRoomUUID] = useState<string>("default-chat-room");
    const [messages, setMessages] = useState<any>([]);

    useEffect(() => {
        window.onfocus = function () {
            document.title = "Chat app";
        };
    }, []);

    useEffect(() => {
        const listener = (value:any) => {
            if (!document.hasFocus()) {
                document.title = "New message...";
            }
        }
        socket.on(EventType.ROOM.MESSAGE.RECEIVED, listener);
        return () => {
            socket.off(EventType.ROOM.MESSAGE.RECEIVED, listener);
        }
    }, [socket]);

  return (
    <SocketContext.Provider
        value={{
            socket,
            memberUUID,
            setMemberUUID,
            roomUUID,
            setRoomUUID,
            messages,
            setMessages
        }}
        {...props}
    />
  );
}

export const useSockets = () => useContext<Context>(SocketContext);

export default SocketsProvider;