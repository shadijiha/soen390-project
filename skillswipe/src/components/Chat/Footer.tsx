import { upload } from '@/pages/api/chat'
import { AttachmentIcon } from '@chakra-ui/icons'
import { Button, Flex, Input, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { IoSendSharp } from 'react-icons/io5'
import { toast } from 'react-toastify'

const Footer = ({  handleSendMessage,sendMessagefile,append}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const input = useRef(document.createElement('input'))
  const [inputMessage, setInputMessage] = useState('')
  const handleClick = () => {
    input.current.click()
  }
  const documentuploadHandler = (e : any) => {
    const token = localStorage.getItem('jwt')
    const fd = new FormData()
    if (e.target.files[0]){
      console.log(e.target.files); 
      fd.append('file', e.target.files[0], e.target.files[0].name)
      append({ext : e.target.files[0].name.split(".").pop(),size : Math.round(e.target.files[0].size/1000),name : e.target.files[0].name,link : "",loaded : false})
      upload(token,fd).then((response) =>{
        console.log(response.data);
        sendMessagefile({ext : e.target.files[0].name.split(".").pop(),size : Math.round(e.target.files[0].size/1000),name : e.target.files[0].name,link : response.data,loaded : true})
        // window.location.reload();
      }).catch((error) =>{
        toast(error.message)
      })

    }
  }
  return (
    <>
      <Flex w="100%" mt="5">
        <Input
          borderRadius="10px"
          color={colorMode === 'light' ? 'black' : 'white'}
          placeholder="Type Something..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage()
            }
          }}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Button
          borderRadius="10px"
          ml={'1rem'}
          onClick={handleClick}
        >
          <AttachmentIcon />
        </Button>

        <Button
          borderRadius="10px"
          disabled={inputMessage.trim().length <= 0}
          onClick={() => {
            setInputMessage('')
            handleSendMessage(inputMessage)
          }}
          ml={'1rem'}
        >
          Send
        </Button>
      </Flex>
      <input onChange={documentuploadHandler} ref={input} type="file" style={{ display: 'none' }}/>
    </>
  )
}

export default Footer
