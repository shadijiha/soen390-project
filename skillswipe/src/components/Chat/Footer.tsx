import { AttachmentIcon } from '@chakra-ui/icons'
import { Button, Flex, Input, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { IoSendSharp } from 'react-icons/io5'

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const input = useRef(document.createElement("div"));
  const handleClick = () =>{
		input.current.click();
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
        disabled={inputMessage.trim().length <= 0}
        ml={'1rem'}
		
		onClick={handleClick}
      >
	

          <AttachmentIcon />

      </Button>

      <Button
        borderRadius="10px"
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
        ml={'1rem'}
		>
        Send
      </Button>
    </Flex>
	<input ref={input} type="file" style={{display : 'none'}}>
	</input>
	</>
	
  )
}

export default Footer
