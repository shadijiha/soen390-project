import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { IoSendSharp } from 'react-icons/io5';


const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  return (

	<Flex w="100%" mt="5">
	

		

  	<Input
		color={"white"}
    	placeholder="Type Something..."
		
    	
    	onKeyPress={(e) => {
			if (e.key === "Enter") {
				handleSendMessage();
			}
    	}}
    	value={inputMessage}
    	onChange={(e) => setInputMessage(e.target.value)}
		/>
	
		
  	<Button
    	bg="black"
    	color="white"
    	borderRadius="none"
    	
    	disabled={inputMessage.trim().length <= 0}
    	onClick={handleSendMessage}
  	>
    	Send
  	</Button>
	</Flex>
  );
};

export default Footer;