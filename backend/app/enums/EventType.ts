const EventType = {
    CONNECTION: 'connection',
    ROOM: {
        USER: {
            CONNECTED: 'room:user:connected',
        },
        MESSAGE: {
            SENT: 'room:message:sent',
            RECEIVED: 'room:message:received' 
        }
    }
}

export default EventType;