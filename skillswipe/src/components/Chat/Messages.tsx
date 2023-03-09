import { Avatar, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const Messages = ({ messages,user}) => {
  const User = useSelector((state) => state as any)
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef(document.createElement("div"))
    useEffect(() => elementRef.current.scrollIntoView(),[])
      return <div ref={elementRef} />
  }

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item, index) => {
        if (item.senderId === User.auth.id) {
          return (
            <Flex key={index} w="100%" justify="flex-end">
              <Flex
                bg="blue.400"
                color="black"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
                borderRadius={'20px'}
              >
                <Text
                  color={'white'}
                  textShadow="1px 1px 5px #0000001B"
                  padding={'0.2rem'}
                >
                  {item.message}
                </Text>
              </Flex>
            </Flex>
          )
        } else {
          return (
            <Flex key={index} w="100%">
              <Avatar
                name="Computer"
                src={user.profilePic?`data:image/jpeg;base64,${user.profilePic}` : process.env.NEXT_PUBLIC_DEFAULT_PICTURE}
                bg="blue.300"
                mr={'1.5rem'}
                boxShadow="lg"
              ></Avatar>
              <Flex
                bg="gray.100"
                color="black"
                minW="100px"
                maxW="350px"
                my="1"
                p="3"
                borderRadius={'20px'}
              >
                <Text padding={'0.2rem'}>{item.message}</Text>
              </Flex>
            </Flex>
          )
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  )
}

export default Messages
