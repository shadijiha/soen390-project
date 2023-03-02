/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { Text } from '@chakra-ui/react'
import { isBrowser } from 'framer-motion'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

const Inbox = () => {
  const router = useRouter()
  const [messages, setMessages] = useState([
    {
      id: 1,
      title: 'Sample message 1',
      text: 'This is a sample message 1',
      avatar: 'https://via.placeholder.com/100x100',
    },
    {
      id: 2,
      title: 'Sample message 2',
      text: 'This is a sample message 2',
      avatar: 'https://via.placeholder.com/100x100',
    },
    {
      id: 3,
      title: 'Sample message 3',
      text: 'This is a sample message 3',
      avatar: 'https://via.placeholder.com/100x100',
    },
  ])
  const [loading, setLoading] = useState(true)
  const handleMessageClick = (message: {
    id: any
    title?: string
    text?: string
  }) => {
    router.push(`/inbox/2`)
  
  };
  // useEffect(() => {
  //   // Will get all the coversations when apis are ready
  // },[])



  return (
    <Layout>
      <NavBar />
      <div className="inbox-container">
        <div className="inbox-header">
          <h1
            className="inbox-header-text"
            style={{
              fontSize: '3rem',
              fontWeight: 600,
            }}
          >
            Inbox
          </h1>
        </div>
        <div className="inbox-body">
          <ul className="inbox-list">
            {messages.map((message) => (
              <li
                key={message.id}
                className="inbox-list-item"
                onClick={() => handleMessageClick(message)}
                onKeyPress={() => handleMessageClick(message)} //to resolve eslint
              >
                <img
                  src={message.avatar}
                  alt={`Avatar for ${message.title}`}
                  className="inbox-list-item-avatar"
                />
                <div className="inbox-list-item-body">
                  <h2 className="inbox-list-item-body-title">{message.title}</h2>
                  <p className="inbox-list-item-body-text">{message.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <style jsx>
          {`
            .inbox-container {
              width: 100%;
              display: flex;
              flex-direction: column;
            }
            .inbox-header {
              width: 100%;
              display: flex;
              align-items: center;
              padding: 1.5rem;
            }
            .inbox-header-text {
              font-size: 3rem;
              margin: 0;
            }
            .inbox-body {
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 1.5rem;
            }
            .inbox-list {
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
            }
            .inbox-list-item {
              width: 100%;
              display: flex;
              align-items: center;
              padding: 1.5rem;
              border-bottom: 1px solid #e2e2e2;
            }

            .inbox-list-item:hover {
              background-color: black;
              cursor: pointer;
            }

            .inbox-list-item > img {
              width: 4rem;
              height: 4rem;
              border-radius: 50%;
              margin-right: 1.5rem;
            }

            .inbox-list-item > h3 {
              font-size: 1.5rem;
              font-weight: 600;
            }

            .inbox-list-item > p {
              font-size: 1.2rem;
              color: #9b9b9b;
            }
            .inbox-list-item-avatar {
              width: 4rem;
              height: 4rem;
              border-radius: 50%;
              margin-right: 1.5rem;
              overflow: hidden;
            }

            .inbox-list-item-avatar > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          `}
        </style>
      </div>
    </Layout>
  )
}

export default Inbox
