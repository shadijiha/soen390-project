import { Button, Heading, Textarea, useColorModeValue } from '@chakra-ui/react'

import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { Box, List, ListItem, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { createPosts, getPosts } from './api/api'

const Home = () => {
  const formBorder = useColorModeValue('gray.100', 'gray.600')
  const postBackground = useColorModeValue('gray.100', 'gray.700')
  const toggleTheme = useColorModeValue('🌙', '💡')
  const User = useSelector((state) => state as any)
  const [posts, setPosts] = useState([
    {
      id: 4,
      content: 'hi this is uzair',
      image: null,
      created_at: '2023-03-28T08:11:07.572Z',
      updated_at: '2023-03-28T08:11:07.572Z',
      deleted_at: null,
    },
  ])
  useEffect(() => {
    if (User.auth) {
      const token = localStorage.getItem('jwt')
      getPosts(token)
        .then((response) => {
          const allPosts = response.data
          // allConvo = allConvo.filter(filterConvo)
          setPosts(allPosts)
          // setLoading(false)
        })
        .catch((error) => {
          toast(error.message)
        })
    }
  }, [User.auth])

  const [createpost, setCreatePost] = useState({content: '' })
  //will remove this eslint once i write this func
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const createPostHandler = () => {
    const token = localStorage.getItem('jwt')
    console.log(createpost);
    createPosts(token, createpost).then((res) => {
      if (res.status == 201 || res.status == 200) {
        toast.success('Sucessfully created post listing.')
      } else {
        toast.error('Error creating post?')
      }
    })
  }
  const handlepost = (e) => {
    setCreatePost({content : e.target.value})
  }
  return (
    <>
      <Layout>
        <NavBar></NavBar>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          data-testid="Home-page"
        >
          <Box>
            <Heading paddingBottom={5}>Welcome, {User.auth.firstName} 🧑🏼‍💻</Heading>
            <Heading
              paddingBottom={5}
              style={{
                fontSize: '1.5rem',
                fontWeight: '300',
              }}
            >
              Recent Posts
            </Heading>
            <div style={{ marginBottom: '3rem' }}>
              <Textarea
                placeholder={'Type anything ...'}
                onChange={handlepost}
                id="creat-box"
              />
              <Button mt={'1rem'} onClick={createPostHandler}>
                Create Post
              </Button>
            </div>

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
                      {post.id}
                    </Text>
                    <Text>{post.content}</Text>
                    <Text>{}</Text>
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
