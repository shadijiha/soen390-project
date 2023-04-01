import { BellIcon } from '@chakra-ui/icons'
import { Badge, IconButton } from '@chakra-ui/react'
import NextLink from 'next/link'
import Pusher from 'pusher-js'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const NotificationCounter = (props: any) => {
  const [counter, setCounter] = useState(0)
  const currentUser = useSelector((state) => state as any)
  useEffect(() => {
    console.log(props.Notifications)
    if (props.Notifications) {
      setCounter(props.Notifications)
    }
  }, [props.Notifications])
  useEffect(() => {
    if (currentUser.auth) {
      const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? 'null'
      const PUSHER_APP_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER ?? 'us2'
      const pusher = new Pusher(PUSHER_APP_KEY, {
        cluster: PUSHER_APP_CLUSTER,
      })
      const channel = pusher.subscribe(`user-${currentUser.auth.id}`)
      channel.bind('friend-request', function (data) {
        setCounter((prevCount) => prevCount + 1)
      })
      channel.bind('message-notification', function (data) {
        setCounter((prevCount) => prevCount + 1)
      })
    }
  }, [currentUser])
  return (
    <NextLink href="/notifications" passHref>
      <div style={{ position: 'relative' }}>
        <IconButton
          aria-label="Notifications"
          icon={<BellIcon />}
          variant="ghost"
          size="lg"
          w="100%"
          my={5}
        ></IconButton>
        <Badge
          colorScheme="red"
          borderRadius="full"
          px="2"
          position="absolute"
          top="20px"
          right="0"
        >
          {props.nbNotifications != null ? props.nbNotifications : counter}
        </Badge>
      </div>
    </NextLink>
  )
}
export default NotificationCounter
