import { Heading, useColorModeValue } from '@chakra-ui/react'

import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { Box, List, ListItem, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const formBorder = useColorModeValue('gray.100', 'gray.600')
  const postBackground = useColorModeValue('gray.100', 'gray.700')
  const toggleTheme = useColorModeValue('🌙', '💡')
  const User = useSelector((state) => state as any)
  const [posts, setPosts] = useState([
    { id: 1, title: 'First Post', body: 'This is a description' },
    {
      id: 2,
      title: 'Second Post',
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    { id: 3, title: 'Third Post', body: 'This is a description' },
  ])

  return (
    <>
      <Layout>
        <NavBar></NavBar>
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <Box>
            <Heading paddingBottom={10}>Welcome {User.auth.firstName}</Heading>
            <Heading paddingBottom={5}>Recent Posts</Heading>
            <List>
              {posts.map((post) => (
                <ListItem key={post.id}>
                  <Box
                    borderWidth="1px"
                    borderColor={formBorder}
                    backgroundColor={postBackground}
                    padding="1rem"
                    marginBottom="1rem"
                    rounded="20"
                    overflow="hidden"
                    width="100%"
                    minW="80vw"
                    maxW="90vw"
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                      {post.title}
                    </Text>
                    <Text>{post.body}</Text>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Layout>
    </>
  )
}

export default Home
