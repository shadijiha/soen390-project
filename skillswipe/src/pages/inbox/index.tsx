/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAllConversation } from '../api/chat'

const Inbox = () => {
  const router = useRouter()
  const [messages, setMessages] = useState([{}])
  const [loading, setLoading] = useState(true)
  const User = useSelector((state) => state as any)
  useEffect(() => {
    if(User.auth){
      const token = localStorage.getItem("jwt")
      getAllConversation(token).then((response) => {
        var allConvo = response.data;
        allConvo = allConvo.filter(filterConvo)
        setMessages(allConvo);    
        setLoading(false);
      }).catch((error) => {
        toast(error.message)
      })
    }
  },[User.auth])
  const filterConvo = (element : any) =>{
    return element.id != User.auth.id

  }
  return (
    <>
      <Layout>
        <NavBar></NavBar>
          {
            loading == true ? 
            <Spinner/>
            :
            <Box p={50}>
          <Heading as="h1" size="lg" mb={4}>
            Inbox
          </Heading>
          {messages.length > 0 ? (
            messages.map((element : any) => (
              <Flex
                key={element.id}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                mb={4}
                display="flex"
                alignItems="center"
                cursor={'pointer'}
                onClick={() => router.push(`/inbox/${element.id}`)}
              >
                <Flex>
                  <Avatar size="lg" mr={4} src={element.profilePic?`data:image/jpeg;base64,${element.profilePic}` : process.env.NEXT_PUBLIC_DEFAULT_PICTURE} />
                  <Box>
                    <Heading as="h2" size="md" mb={2}>
                      {`${element.firstName} ${element.lastName}`}
                      
                    </Heading>
                    <Text mb={2}>{element.text}</Text>
                  </Box>
                </Flex>
                <Spacer />
              </Flex>
            ))
          ) : (
            <h1>No new message</h1>
          )}
        </Box>
          }
        
      </Layout>
    </>
  )
}

export default Inbox
