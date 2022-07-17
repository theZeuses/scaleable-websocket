import { Server, Socket } from "socket.io";

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    [index: string]: any
}
export type SocketIO = ClientToServerEvents & ServerToClientEvents & InterServerEvents & SocketData;

let socketio!: SocketIO;

export const initializeIO = async (server: any) => {
    socketio = new Server(server, {
        cors: {
          origin: "*",    
          methods: ["GET", "POST"]
        }
    });
    return socketio;
}

const io = () : SocketIO => (socketio as SocketIO);

export default io;