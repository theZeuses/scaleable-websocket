class Message
{
    text!: string;
    uuid?: string;
    image?: string;
    member_uuid!: string;
    room_uuid!: string;
    owner!: string;
    _id!: string;

    constructor({ _id, uuid, text, image, member_uuid, room_uuid, owner}: Message){
        this._id = _id;
        this.uuid = uuid;
        this.text = text;
        this.image = image;
        this.member_uuid = member_uuid;
        this.room_uuid = room_uuid;
        this.owner = owner;
    }
}

export default Message;