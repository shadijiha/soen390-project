import { Avatar, Box, Flex, Heading, Link, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { defaultStyles, FileIcon } from 'react-file-icon'
import { useSelector } from 'react-redux'

const Messages = ({ messages, user }) => {
  const User = useSelector((state) => state as any)
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef(document.createElement('div'))
    useEffect(() => elementRef.current.scrollIntoView(), [])
    return <div ref={elementRef} />
  }

  return (
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map((item, index) => {
        var data = false
        var file = {ext: '', link: '', name: '',size : 0,loaded : false }
        try {
          file = JSON.parse(item.message)
          data = true
        } catch (error) {
          var data = false
        }
        console.log(file)
        if (item.senderId == User.auth.id) {
          if (data == true) {
            return (
              <Flex key={index} w="100%" justify="flex-end">
                <Flex
                bg={"blue.400"}
                  color="black"
                  minW="100px"
                  maxW="500px"
                  my="1"
                  p="3"
                  borderRadius={'20px'}
                  flexDirection={'row'}
                  justifyContent={'center'}
                >
                  <Box boxSize={"16"}>
                    <FileIcon  extension={file.ext}/>
                  </Box>           
                  <Flex ml={2} flexDir={'column'}>

                  <Text opacity={0.75} color={'white'}fontSize="lg" ml={1} mt={4} mr={2}>
                    <Link href={file.link}>{file.name}</Link>
                  </Text>
                  <Text opacity={0.75} color={'white'}fontSize="sm" mt={2} ml={1} mr={2}>
                    {`${file.size} KB`}
                  </Text>

                  </Flex>
                  {file.loaded == false ? <Spinner/> : <></>}
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
                <Box boxSize={"16"}>
                    <FileIcon color={"black"} extension={file.ext} />
                  </Box>           
                  <Flex ml={2} flexDir={'column'}>

                  <Text opacity={0.75} color={'black'}fontSize="lg" ml={1} mt={4} mr={2}>
                    <Link href={file.link}>{file.name}</Link>
                  </Text>
                  <Text opacity={0.75} color={'black'}fontSize="sm" mt={2} ml={1} mr={2}>
                    {`${file.size} KB`}
                  </Text>

                  </Flex>
                  {file.loaded == false ? <Spinner/> : <></>}
               
                
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
                >
                  {item.message}
                 
                  
                </Flex>
              </Flex>
            )
          }
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  )
}

export default Messages
