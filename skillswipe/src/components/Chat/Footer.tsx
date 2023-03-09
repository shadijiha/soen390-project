import { Button, Flex, Input, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { IoSendSharp } from 'react-icons/io5'

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
	const { colorMode, toggleColorMode } = useColorMode()
  return (

	<Flex w="100%" mt="5">
  	<Input
        borderRadius="10px"
        color={colorMode === 'light' ? "black" : "white"}
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
    	onClick={handleSendMessage}
        ml={'2rem'}
  	>
    	Send
  	</Button>
	</Flex>
  )
}

export default Footer
