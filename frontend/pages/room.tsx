import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import ChatRoomLayout from '../layouts/ChatRoomLayout'
import { NextPageWithLayout } from './_app'
import ChatRoom from '../components/ChatRoom/index';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router';
import SocketsProvider, { useSockets } from '../context/socket.context';
import EventType from '../enums/EventType';

const Page: NextPageWithLayout = () => {
  const { socket, roomUUID, memberUUID, setMemberUUID } = useSockets();
  socket.emit(EventType.ROOM.USER.CONNECTED, {room_uuid: roomUUID, member_uuid: memberUUID});
  
  return (
    <SocketsProvider>
        <Head>
            <title>Room</title>
        </Head>
        <ChatRoom />
    </SocketsProvider>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <ChatRoomLayout>
      {page}
    </ChatRoomLayout>
  )
}

export default Page
