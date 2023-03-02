import NavBar from "@/components/NavBar";
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Divider } from "@chakra-ui/react";
import Footer from "../../components/Chat/Footer";
import Header from "../../components/Chat/Header";
import Messages from "../../components/Chat/Messages";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { message } from "../api/chat";
import { toast } from "react-toastify";
import { getUserById } from "../api/api";
const Chat = () => {
	const User = useSelector((state) => state as any)
	const [inputMessage, setInputMessage] = useState("");

	const router = useRouter();
	const [messages, setMessages] = useState([
		{ from: "computer", text: "Hi, My Name is HoneyChat" },
		{ from: "me", text: "Hey there" },
		{ from: "me", text: "Myself Ferin Patel" },
		{
			from: "computer",
			text: "Nice to meet you. You can send me message and i'll reply you with same message.",
		},
	]);

	const handleSendMessage = () => {
		if (!inputMessage.trim().length) {
			return;
		}
		const data = inputMessage;
		const token = localStorage.getItem("jwt")
		message(token,{"message" : data,"senderId":User.auth.id,"receiverId" : router.query.id}).then((Response) => {
			setMessages((old) => [...old, { from: "me", text: data }]);
			setInputMessage("");
		}).catch((error) => {
			toast(error.message)

		})
	};
	useEffect(() => {
		if(router.query.id){
		
			// Get coversation by ID will doo when apis are fully ready
			// Message is fully function 
			const id = router.query.id;
			// TODO Add the keys in env file 
			const PUSHER_APP_KEY = '824217e5cf11afe06857'
			const PUSHER_APP_CLUSTER = 'us2'
			var pusher = new Pusher(PUSHER_APP_KEY, {
				cluster : PUSHER_APP_CLUSTER
			  });
			var channel = pusher.subscribe(`message-${User.auth.id}`);
			console.log(channel)
			channel.bind('message', function(data : any) {
				console.log(data)
				if(data.sender == id){
					setMessages((old) => [...old, { from: "computer", text: data.message }]);
					
				}
			});	  
		}
	},[router.query])
	return (
		<>
		<Layout>
			<NavBar />
			<Flex mt={0} w="100%" h="150vh" justify="center" >
				<Flex w="65%" h="75%" flexDir="column">
					<h1>{User.auth.firstName}</h1>
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
						</Layout>
		</>

	);
};
export default Chat
