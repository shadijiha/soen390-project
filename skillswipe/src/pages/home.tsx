import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import styles from '@/styles/modal.module.css'
import {
  background,
  Box,
  Button,
  Heading,
  HStack,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import { toast } from 'react-toastify'
import { createPosts, getPosts } from './api/api'

const Home = () => {
  const formatDate = (dateString) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }

    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', options).format(date)
  }
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
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

  const [createpost, setCreatePost] = useState({ content: '' })
  //will remove this eslint once i write this func
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const createPostHandler = () => {
    const token = localStorage.getItem('jwt')
    console.log(createpost)
    createPosts(token, createpost).then((res) => {
      if (res.status == 201 || res.status == 200) {
        toast.success('Sucessfully created post listing.')
      } else {
        toast.error('Error creating post?')
      }
    })
  }
  const handlepost = (e) => {
    setCreatePost({ content: e.target.value })
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
            <HStack paddingBottom={5}>
              <Heading marginRight={3}>Welcome, {User.auth.firstName} 🧑🏼‍💻</Heading>
              <Button borderRadius="50px" onClick={() => setIsOpen(true)}>
                Create Post
              </Button>
            </HStack>
            <Heading
              paddingBottom={5}
              style={{
                fontSize: '1.5rem',
                fontWeight: '300',
              }}
            >
              Recent Posts
            </Heading>
            <div style={{ marginBottom: '3rem' }}></div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay className={styles.blurred} />
                <ModalContent
                  margin={'auto'}
                  borderRadius="30px"
                  padding={'1em'}
                  borderColor={formBorder}
                  backgroundColor={postBackground}
                  borderWidth="2px"
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                  minWidth={'50%'}
                >
                  <ModalHeader
                    style={{
                      fontWeight: '300',
                    }}
                  >
                    Have something on your 🧠?
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <TextareaAutosize
                      placeholder={'Type anything...'}
                      onChange={handlepost}
                      id="creat-box"
                      minRows={2}
                      style={{
                        border: '0px solid #E2E8F00D',
                        borderRadius: '10px',
                        padding: '1rem',
                        width: '100%',
                        display: 'block',
                        margin: 'auto',
                        backgroundColor: 'transparent',
                        resize: 'none',
                      }}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={createPostHandler}
                      borderRadius="50px"
                    >
                      Post
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
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
                    <HStack display={'flex'} justifyContent={'space-between'}>
                      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                        {post.id}
                      </Text>
                      <Text>{formatDate(post.created_at)}</Text>{' '}
                    </HStack>
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
