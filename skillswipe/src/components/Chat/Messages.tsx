import { ReportApi } from '@/pages/api/profile_api'
import {
  Avatar,
  Box,
  Flex,
  Link,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { FileIcon } from 'react-file-icon'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Dialog from '../Dialog'

const Messages = ({ messages, user }) => {
  const User = useSelector((state) => state as any)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [chatId, setChatId] = useState(-1)
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef(document.createElement('div'))
    useEffect(() => elementRef.current.scrollIntoView(), [])
    return <div ref={elementRef} />
  }

  const OnClickReport = (id: any) => {
    setChatId(id)
    onOpen()
  }

  const Report = () => {
    if (localStorage.getItem('jwt') && chatId != -1) {
      ReportApi(localStorage.getItem('jwt'), { type: 'chat', entity_id: chatId })
        .then((response) => {
          toast('Successfully Reported the Message')
          onClose()
        })
        .catch((err) => {
          toast(err.message)
          onClose()
        })
    } else {
      onClose()
    }
  }

  return (
    <>
      <Dialog isOpen={isOpen} onOpen={onOpen} onClose={onClose} Report={Report} />
      <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
        {messages.map((item, index) => {
          var data = false

          var file = { ext: '', link: '', name: '', size: 0, loaded: false }

          try {
            file = JSON.parse(item.message)
            if (file.ext && file.size) {
              data = true
            } else {
              data = false
            }
          } catch (error) {
            var data = false
          }

          if (!isNaN(parseFloat(item.message)) && isFinite(item.message)) {
            data = false
          }

          if (item.senderId == User.auth.id) {
            if (data == true) {
              return (
                <Flex key={index} w="100%" justify="flex-end">
                  <Flex
                    bg={'blue.400'}
                    color="black"
                    minW="100px"
                    maxW="500px"
                    my="0"
                    p="3"
                    borderRadius={'20px'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                  >
                    <Box boxSize={'16'}>
                      <FileIcon extension={file.ext} />
                    </Box>
                    <Flex ml={2} flexDir={'column'}>
                      <Text
                        opacity={0.75}
                        color={'white'}
                        fontSize="lg"
                        ml={1}
                        mt={4}
                        mr={2}
                      >
                        <Link href={file.link}>{file.name}</Link>
                      </Text>
                      <Text
                        opacity={0.75}
                        color={'white'}
                        fontSize="sm"
                        mt={2}
                        ml={1}
                        mr={2}
                      >
                        {`${file.size} KB`}
                      </Text>
                    </Flex>
                    {file.loaded == false ? <Spinner /> : <></>}
                  </Flex>
                </Flex>
              )
            } else {
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
            }
          } else {
            if (data == true) {
              return (
                <Flex key={index} w="100%">
                  <Avatar
                    name="Computer"
                    src={
                      user.profilePic
                        ? `data:image/jpeg;base64,${user.profilePic}`
                        : process.env.NEXT_PUBLIC_DEFAULT_PICTURE
                    }
                    bg="blue.300"
                    mr={'1.5rem'}
                    boxShadow="lg"
                  ></Avatar>
                  <Flex
                    bg="gray.100"
                    color="black"
                    minW="100px"
                    maxW="500px"
                    my="1"
                    p="3"
                    borderRadius={'20px'}
                  >
                    <Box boxSize={'16'} mt={'10px'}>
                      <FileIcon color={'black'} extension={file.ext} />
                    </Box>
                    <Flex ml={2} flexDir={'column'}>
                      <Text
                        opacity={0.75}
                        color={'black'}
                        fontSize="lg"
                        ml={0}
                        mt={4}
                        mr={2}
                      >
                        <Link href={file.link}>{file.name}</Link>
                      </Text>
                      <Text
                        opacity={0.75}
                        color={'black'}
                        fontSize="sm"
                        mt={2}
                        ml={0}
                        mr={2}
                      >
                        {`${file.size} KB`}
                      </Text>
                      <Text
                        style={{
                          fontSize: '10px',
                          color: 'grey',
                          cursor: 'pointer',
                        }}
                        onClick={() => OnClickReport(item.id)}
                      >
                        Report
                      </Text>
                    </Flex>
                    {file.loaded == false ? <Spinner /> : <></>}
                  </Flex>
                </Flex>
              )
            } else {
              return (
                <Flex key={index} w="100%">
                  <Avatar
                    name="Computer"
                    src={
                      user.profilePic
                        ? `data:image/jpeg;base64,${user.profilePic}`
                        : process.env.NEXT_PUBLIC_DEFAULT_PICTURE
                    }
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
                    flexDir={'column'}
                  >
                    {item.message}
                    <Text
                      style={{ fontSize: '10px', color: 'grey', cursor: 'pointer' }}
                      onClick={() => {
                        OnClickReport(item.id)
                      }}
                    >
                      Report
                    </Text>
                  </Flex>
                </Flex>
              )
            }
          }
        })}
        <AlwaysScrollToBottom />
      </Flex>
    </>
  )
}

export default Messages
