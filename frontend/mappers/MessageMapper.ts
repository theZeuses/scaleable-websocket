import Message from "../models/Message";

const messageMapper = {
    mapMessages: (messages: any) => {
        let list: Message[] = []
        messages.forEach((message: any) => {
            list.push(new Message(message))
        });
        return list;
    },
    mapMessage: (message: any) => {
        if (message) {
            return new Message(message);
        }

        return null;
    }
}

export default messageMapper;