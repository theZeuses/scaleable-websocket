import Header from "./Header"
import MessageList from "./MessageList"
import Writer from "./Writer"
import { Socket } from 'socket.io-client';

type ChatRoomProp = {
    messages: {
        image?: string,
        uuid: string,
        text: string,
        member_uuid: string,
        chat_room_uuid: string,
        id: string
    }[],
    socket: Socket | undefined
}
function ChatRoom() {
    return (
      <div className="flex mt-4">
          <div className="w-10/12 max-h-full border rounded mx-auto">
            <Header />
            <MessageList />
            <Writer />
          </div>
      </div>
    )
  }
  
  export default ChatRoom