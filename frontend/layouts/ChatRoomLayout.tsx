import { ReactNode } from "react";
import Nav from "../components/Nav";

type ChatRoomLayoutProps = {    
    children: ReactNode
}
function ChatRoomLayout({ children }: ChatRoomLayoutProps) {
    return (
        <div>
            <Nav />
            <main>{children}</main>
        </div>
    );
}

export default ChatRoomLayout;