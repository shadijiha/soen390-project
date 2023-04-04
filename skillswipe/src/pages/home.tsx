/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import styles from '@/styles/modal.module.css'
import { DeleteIcon } from '@chakra-ui/icons'
import {
  Avatar,
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
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import router from 'next/router'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import { toast } from 'react-toastify'
import { createPosts, deletePost, getOpenJobs, getPosts } from './api/api'
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
  // const FileDropzone = () => {
  //   const onDrop = useCallback((acceptedFiles) => {
  //     // Handle files here
  //     console.log(acceptedFiles)
  //   }, [])

  //   const options: DropzoneOptions = {
  //     onDrop,
  //     accept: 'image/*' as any,
  //   }

  //   const { getRootProps, getInputProps, isDragActive } = useDropzone(options)

  //   return (
  //     <div
  //       {...getRootProps()}
  //       style={{
  //         backgroundColor: 'transparent',
  //         border: useColorModeValue('1px dashed #26262673', '1px dashed #FFFFFF78'),
  //         borderWidth: '1px',
  //         borderRadius: '20px',
  //         width: '100%',
  //         height: '100%',
  //         display: 'flex',
  //       }}
  //     >
  //       <input {...getInputProps()} accept="image/*" />
  //       <VStack
  //         direction={'column'}
  //         flex={1}
  //         alignContent={'center'}
  //         padding={'10px'}
  //       >
  //         <p
  //           style={{
  //             color: useColorModeValue('gray.500', 'gray.400'),
  //             textAlign: 'center',
  //           }}
  //         >
  //           Drag and drop image here or click to browse
  //         </p>
  //         <img
  //           src="https://img.icons8.com/cute-clipart/512/image-file.png"
  //           alt="upload"
  //           width="50px"
  //           height="50px"
  //         />
  //       </VStack>
  //     </div>
  //   )
  // }
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
      id: 13,
      content: 'hey',
      image: null,
      created_at: '2023-03-31T17:47:41.043Z',
      updated_at: '2023-03-31T17:47:41.043Z',
      deleted_at: null,
      user: {
        id: 4,
        firstName: 'usama',
        lastName: 'saleem',
        email: 'messi@gmail.com',
        mobileNo: null,
        gender: 'MALE',
        profilePic: null,
        coverPic: null,
        cv: null,
        coverLetter: null,
        biography: null,
        userStatus: 'online',
        type: 'User',
        created_at: '2023-03-02T22:50:47.902Z',
        updated_at: '2023-03-28T05:07:19.000Z',
        deleted_at: null,
      },
    },
  ])
  useEffect(() => {
    if (User.auth) {
      const token = localStorage.getItem('jwt')
      getPosts(token)
        .then((response) => {
          const allPosts = response.data
          setPosts(allPosts)
        })
        .catch((error) => {
          toast(error.message)
        })
    }
  }, [User.auth])

  const [createpost, setCreatePost] = useState({ content: '', image: '' })
  const createPostHandler = () => {
    const fd = new FormData()
    fd.append('image', createpost.image, 'post image')
    const token = localStorage.getItem('jwt')
    //if we replace createpost with fd then u can post only image  (no content)
    createPosts(token, createpost).then((res) => {
      if (res.status == 201 || res.status == 200) {
        toast.success('Sucessfully created post')
      } else {
        toast.error('Error creating post')
      }
    })
  }
  const handlepost = (e) => {
    setCreatePost({ ...createpost, content: e.target.value })
  }
  const handleFiles = (e) => {
    console.log(e.target.files[0])
    setCreatePost({ ...createpost, image: e.target.files[0] })
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
          <Box marginLeft={'2rem'}>
            <HStack paddingBottom={5}>
              <Heading marginRight={3}>Welcome, {User.auth.firstName} 🧑🏼‍💻</Heading>
              <Button
                borderRadius="50px"
                onClick={() => setIsOpen(true)}
                data-testid="create-button"
              >
                Create Post
              </Button>
            </HStack>
            <Heading
              paddingBottom={0}
              style={{
                fontSize: '1.5rem',
                fontWeight: '500',
              }}
            >
              🏠 Recent Posts
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
                      data-testid="create-post"
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
                    <Box style={{ marginTop: '1rem' }} height="100px">
                      {/* <FileDropzone /> */}
                      <input type={'file'} onChange={handleFiles}></input>
                    </Box>
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
                            size="md"
                            mr={4}
                            src={
                              post.user.profilePic
                                ? `data:image/jpeg;base64,${post.user.profilePic}`
                                : process.env.NEXT_PUBLIC_DEFAULT_PICTURE
                            }
                          />
                          <Text
                            flex={1}
                            style={{
                              fontWeight: 'bold',
                              marginLeft: '0.5rem',
                            }}
                          >
                            {post.user.firstName} {post.user.lastName}
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

                          {User.auth.id === post.user.id ? (
                            <Button
                              colorScheme="red"
                              size="sm"
                              borderRadius="50px"
                              onClick={() => {
                                const token = localStorage.getItem('jwt')
                                deletePost(token, post.id).then((res) => {
                                  if (res.status == 201 || res.status == 200) {
                                    toast.success('Sucessfully deleted post')
                                  } else {
                                    toast.error('Can only delete your post')
                                  }
                                })
                              }}
                              style={{
                                marginTop: '0.5rem',
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          ) : null}
                        </HStack>
                        {post.image !== null ? (
                          <HStack>
                            {' '}
                            <img
                              alt="post pic"
                              width={'80%'}
                              src={
                                post.image
                                  ? `data:image/jpeg;base64,${post.image}`
                                  : post.image
                              }
                            />
                          </HStack>
                        ) : null}
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box width={'30%'} display={{ base: 'none', md: 'block' }}>
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
                            border={useColorModeValue('gray.200', 'gray.600')}
                            borderWidth="4px"
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
