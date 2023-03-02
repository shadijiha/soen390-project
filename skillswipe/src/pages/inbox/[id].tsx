import NavBar from "@/components/NavBar";
import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { Divider } from "@chakra-ui/react";
import Footer from "../../components/Chat/Footer";
import Header from "../../components/Chat/Header";
import Messages from "../../components/Chat/Messages";

const Chat = () => {
	const [messages, setMessages] = useState([
		{ from: "computer", text: "Hi, My Name is HoneyChat" },
		{ from: "me", text: "Hey there" },
		{ from: "me", text: "Myself Ferin Patel" },
		{
			from: "computer",
			text: "Nice to meet you. You can send me message and i'll reply you with same message.",
		},
	]);
	const [inputMessage, setInputMessage] = useState("");

	const handleSendMessage = () => {
		if (!inputMessage.trim().length) {
			return;
		}
		const data = inputMessage;

		setMessages((old) => [...old, { from: "me", text: data }]);
		setInputMessage("");

		setTimeout(() => {
			setMessages((old) => [...old, { from: "computer", text: data }]);
		}, 1000);
	};

	return (
		<>
			<NavBar />

			<Flex mt={0} w="100%" h="150vh" justify="center" >
				<Flex w="65%" h="75%" flexDir="column">
					
					<Header />
					<Divider/>
					<Messages messages={messages} />
					<Divider />
					<Footer
						inputMessage={inputMessage}
						setInputMessage={setInputMessage}
						handleSendMessage={handleSendMessage}
					/>

				</Flex>
			</Flex>
		</>

	);
};
export default Chat