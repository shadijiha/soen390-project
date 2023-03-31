/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import styles from '@/styles/modal.module.css'
import {
  Avatar,
  background,
  Box,
  Button,
  chakra,
  Divider,
  Grid,
  Heading,
  HStack,
  Link,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import router from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import { toast } from 'react-toastify'
import { createPosts, getOpenJobs, getPosts } from './api/api'
interface JobAttributes {
  id: number
  jobTitle: ''
  companyName: ''
  location: ''
  jobDescription: ''
  salary: ''
  skills: ''
  startDate: ''
  jobType: ''
  coverLetter: false | true
  transcript: false | true
}
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

  const [jobListing, setJobListing] = useState<JobAttributes[]>([])
  const [initialJobListing, setInitalJobListing] = useState<JobAttributes[]>([])

  useEffect(() => {
    const viewOpenJobs = async () => {
      // Get token from local storage
      const token = localStorage.getItem('jwt')

      try {
        // Call API function to get open jobs

        const response = await getOpenJobs(token)

        // Update state with fetched data
        setInitalJobListing(response.data)
        setJobListing(response.data)
      } catch (error) {
        console.error(error)
        toast.error('Error getting jobs')
      }
    }
    viewOpenJobs()
  }, [])

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

            <HStack spacing={8} align="start">
              <Box width={{ base: '100%', md: '70%' }}>
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
                        minWidth={'100%'}
                        // maxW={'700px'}
                      >
                        <HStack
                          spacing={6}
                          flexDirection={'row'}
                          alignItems={'center'}
                          width={'100%'}
                        >
                          <Avatar
                            size="sm"
                            name={User.auth.firstName + User.auth.lastName}
                            src="https://bit.ly/broken-link"
                          />
                          <Text
                            flex={1}
                            style={{
                              fontWeight: 'bold',
                              marginLeft: '0.5rem',
                            }}
                          >
                            {User.auth.firstName} {User.auth.lastName}
                          </Text>

                          <Text
                            style={{
                              opacity: '0.5',
                            }}
                          >
                            {formatDate(post.created_at)}
                          </Text>
                        </HStack>
                        <HStack justifyContent={'space-between'}>
                          <Text>{post.content}</Text>
                          <Button
                            colorScheme="red"
                            size="sm"
                            borderRadius="50px"
                            style={{
                              marginTop: '0.5rem',
                            }}
                          >
                            Report
                          </Button>
                        </HStack>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box width={'30%'} display={{ base: 'none', md: 'block' }}>
                {' '}
                <Text
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '300',
                    textAlign: 'center',
                    backgroundColor: useColorModeValue('gray.100', 'gray.700'),
                    padding: '1rem',
                    marginBottom: '1rem',
                    borderRadius: '50px',
                    borderColor: useColorModeValue('gray.200', 'gray.600'),
                    borderWidth: '2px',
                  }}
                >
                  <b>Open Jobs for You</b>
                </Text>
                {jobListing.map((job, index) => (
                  <Fragment key={index}>
                    <Grid
                      w="100%"
                      minW={{ base: 'unset', sm: '100vh' }}
                      templateColumns={{ base: 'unset' }}
                      p={{ base: 2, sm: 4 }}
                      gap={3}
                      _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                    >
                      <Box>
                        <HStack spacing={3}>
                          <img
                            src={`http://www.${job.companyName.toLowerCase()}.com/favicon.ico`}
                            width="15px"
                            height="15px"
                            alt="logo"
                            onError={(e) => {
                              // show a default image if the company logo is not found
                              e.currentTarget.src =
                                'https://img.icons8.com/3d-fluency/512/hard-working.png'
                            }}
                          />

                          <chakra.h2 fontWeight="bold" fontSize="md">
                            {job.companyName}
                          </chakra.h2>
                          {/* quick apply job button */}
                          <Button
                            colorScheme="blue"
                            size="sm"
                            borderRadius="50px"
                            onClick={() => {
                              router.push(`/jobListing/${job.id}`)
                            }}
                          >
                            Quick Apply
                          </Button>
                        </HStack>

                        <chakra.h3
                          as={Link}
                          isExternal
                          fontWeight="extrabold"
                          fontSize="15px"
                          onClick={() => {
                            router.push(`/jobListing/${job.id}`)
                          }}
                        >
                          {job.jobTitle}
                        </chakra.h3>

                        <div
                          style={{
                            paddingTop: '0.5em',
                          }}
                        ></div>

                        <chakra.p
                          fontWeight="bold"
                          fontSize="sm"
                          color={useColorModeValue('gray.600', 'gray.300')}
                        >
                          📍 {job.location}
                        </chakra.p>
                        <chakra.p
                          fontWeight="normal"
                          fontSize="sm"
                          color={useColorModeValue('gray.600', 'gray.300')}
                        >
                          💼 ‎
                          {job.jobType.charAt(0).toUpperCase() +
                            job.jobType.slice(1)}
                        </chakra.p>
                        <Grid
                          alignItems="start"
                          fontWeight="light"
                          fontSize={{ base: 'xs', sm: 'sm' }}
                          color={useColorModeValue('gray.600', 'gray.300')}
                        >
                          {/* By the way, the ‎ is an invisible space character */}
                          <chakra.p>
                            {/* format the starting date to be only year month and date */}
                            📅 ‎ ‎ Starting Date: {job.startDate.split('T')[0]}
                          </chakra.p>
                          <chakra.p>🤑 ‎ ‎ Salary: ${job.salary}/hr</chakra.p>
                          <chakra.p>
                            🏫 ‎ ‎ Transcript Needed? ‎ ‎
                            {job.transcript.toString() == 'true' ? '✅' : '❌'}
                          </chakra.p>
                          <chakra.p>
                            💌 ‎ ‎ Cover Letter Needed? ‎ ‎
                            {job.coverLetter.toString() == 'true' ? '✅' : '❌'}
                          </chakra.p>
                        </Grid>
                      </Box>
                    </Grid>
                    {jobListing.length - 1 !== index && <Divider m={0} />}
                  </Fragment>
                ))}
              </Box>
            </HStack>
          </Box>
        </Box>
        <div style={{ marginBottom: '3rem' }}></div>
      </Layout>
    </>
  )
}

export default Home
