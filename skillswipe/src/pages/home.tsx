/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
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
  Center,
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
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import router from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import { toast } from 'react-toastify'
import {
  applyToJob,
  checkLogin,
  createPosts,
  deletePost,
  getOpenJobs,
  getPosts,
} from './api/api'
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

interface UserAttributes {
  id: number
  firstName: string
  lastName: string
  email: string
  mobileNo: string
  gender: string
  profilePic: string | null
  coverPic: string | null
  cv: string | null
  coverLetter: string | null
  biography: string
  userStatus: string
  type: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

const Home = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [postToDeleteId, setPostToDeleteId] = useState(null)

  const handleDeleteClick = (postId) => {
    setPostToDeleteId(postId)
    setIsConfirmOpen(true)
  }
  const handlePostDelete = () => {
    if (postToDeleteId) {
      const token = localStorage.getItem('jwt')
      deletePost(token, postToDeleteId)
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            toast.success('Successfully deleted post')
            // add reload method here to ensure reloading happens after successful deletion
            setTimeout(() => {
              window.location.reload()
            }, 0)
          } else {
            toast.error('Can only delete your post')
          }
        })
        .catch((error) => {
          toast.error('Error deleting post')
        })
    }
    setIsConfirmOpen(false)
  }
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
  const [jobListing, setJobListing] = useState([
    {
      id: 5,
      jobTitle: 'Software Engineering Intern',
      companyName: 'Amazon',
      location: 'Montreal',
      jobDescription: 'bjdwbchjbvdhcvdhjcvbmnd m',
      salary: '20',
      jobType: 'full-time',
      startDate: '2023-03-23T04:00:00.000Z',
      coverLetter: true,
      transcript: true,
      created_at: '2023-03-16T20:19:34.940Z',
      updated_at: '2023-03-16T20:19:34.940Z',
      user: {
        id: 4,
        firstName: '',
        lastName: '',
        email: 'messi@gmail.com',
        mobileNo: '',
        gender: 'MALE',
        profilePic: '',
        coverPic: null,
        cv: '',
        coverLetter: '',
        biography: null,
        userStatus: 'online',
        type: 'User',
        created_at: '2023-03-02T22:50:47.902Z',
        updated_at: '2023-04-05T03:48:54.000Z',
        deleted_at: null,
      },
      skills: [
        {
          id: 1,
          title: 'C++',
          created_at: '2023-03-02T22:52:53.844Z',
          updated_at: '2023-03-02T22:52:53.844Z',
        },
        {
          id: 2,
          title: 'Java',
          created_at: '2023-03-02T22:53:07.867Z',
          updated_at: '2023-03-02T22:53:07.867Z',
        },
      ],
    },
  ])
  const [initialJobListing, setInitalJobListing] = useState<JobAttributes[]>([])
  const [userId, setUserId] = useState(0)
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userCv, setUserCv] = useState('')
  const [userCover, setUserCover] = useState('')
  const handleSubmit = (event, jobId) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()

    const submitApp = {
      userId: userId,
      name: `${userFirstName} ${userLastName}`,
      email: userEmail,
      phone: userPhone,
      ...(userCv && { cv: userCv }),
      coverLetter: userCover,
      id: 0,
    }

    const missingFields = [] as string[]

    if (!submitApp.name) {
      missingFields.push('name')
    }
    if (!submitApp.email) {
      missingFields.push('email')
    }
    if (!submitApp.phone) {
      missingFields.push('phone')
    }

    if (missingFields.length > 0) {
      const message = `Missing fields: ${missingFields.join(', ')}`
      toast.error(message)
      return
    } else {
      applyToJob(token, jobId, submitApp)
        .then((res) => {
          if (res.status == 201 || res.status == 200) {
            toast.success('Successfully applied to job. Good luck!')
          } else {
            console.error('Error applying to job!', res.data)
            toast.error(res.data.message) // toast the error message
          }
        })
        .catch((error) => {
          console.error('Error applying to job!', error)
          toast.error('Error 2 occurred. Please try again later.')
        })
    }
  }
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('jwt')
      // fetch checkLogin API
      const response = await checkLogin(token)
      const data: UserAttributes = response.data

      // Access the user attributes
      const userId = data.id
      const userFirstName = data.firstName
      const userLastName = data.lastName
      const userEmail = data.email
      const userPhone = data.mobileNo
      const userCv = data.cv
      const userCover = data.coverLetter

      // Update state variables with user data
      setUserId(userId)
      setUserFirstName(userFirstName)
      setUserLastName(userLastName)
      setUserEmail(userEmail)
      setUserPhone(userPhone)
      setUserCv('')
      setUserCover('')

      console.log('User ID:', userId)
      console.log('User first name:', userFirstName)
      console.log('User last name:', userLastName)
      console.log('User email:', userEmail)
      console.log('User phone:', userPhone)
      console.log('User CV:', userCv)
      console.log('User cover letter:', userCover)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }
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
  const { t } = useTranslation('common')
  // const [jobListing, setJobListing] = useState<JobAttributes[]>([])
  // const [initialJobListing, setInitalJobListing] = useState<JobAttributes[]>([])
  const [preview, setPreview] = useState<any>(null)
  const input = useRef<any>(null)

  useEffect(() => {
    fetchUserData()
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
    if (createpost.image) {
      fd.append('image', createpost.image, 'post image')
    }

    fd.append('content', createpost.content)
    const token = localStorage.getItem('jwt')
    createPosts(token, fd).then((res) => {
      if (res.status == 201 || res.status == 200) {
        toast.success('Sucessfully created post')
      } else {
        toast.error('Error creating post')
      }
    })
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }
  const handlepost = (e) => {
    setCreatePost({ ...createpost, content: e.target.value })
  }
  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      console.log(reader)
      reader.onload = () => {
        setCreatePost({ ...createpost, image: e.target.files[0] })
        setPreview(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  const leastDestructiveRef = useRef(null)

  const HoverableGrid = ({ children, ...props }) => {
    return (
      <Box borderRadius="18px" {...props}>
        <Grid
          p={{ base: 2, sm: 4 }}
          gap={3}
          _hover={{
            boxShadow: '0 0 0 2px #3182ce',
            // maxWidth: '-1',
            borderRadius: '18px',
            maxWidth: '50%',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {children}
        </Grid>
      </Box>
    )
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
              <Heading marginRight={3}>
                {t('welcome')}, {User.auth.firstName} 🧑🏼‍💻
              </Heading>
              <Button
                borderRadius="50px"
                onClick={() => setIsOpen(true)}
                data-testid="create-button"
              >
                {t('createPost')}
              </Button>
            </HStack>
            <Heading
              paddingTop={1}
              style={{
                fontSize: '1.5rem',
                fontWeight: '500',
              }}
            >
              🏠 {t('recent posts')}
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
                    {t('Have something on your')} 🧠?
                  </ModalHeader>

                  <ModalBody>
                    <Box
                      padding={'5px'}
                      borderRadius={'30px'}
                      border="1px solid currentColor"
                    >
                      <Center>
                        {preview ? (
                          <img
                            style={{
                              borderRadius: '10px',
                              maxHeight: '200px',
                              maxWidth: 'auto',
                            }}
                            src={preview}
                          />
                        ) : (
                          <h1
                            onClick={() => {
                              input.current.click()
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            {t('Click to upload Picture')}
                          </h1>
                        )}

                        {/* </h1> */}
                      </Center>
                    </Box>
                    <TextareaAutosize
                      placeholder={t('Type anything...')}
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
                        marginTop: '20px',

                        backgroundColor: 'transparent',
                        resize: 'none',
                      }}
                    />
                    <Box style={{ marginTop: '1rem' }} height="100px">
                      {/* <FileDropzone /> */}
                      <input
                        ref={input}
                        style={{ display: 'none' }}
                        type={'file'}
                        onChange={handleImageChange}
                      ></input>
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={createPostHandler}
                      borderRadius="50px"
                    >
                      {t('Post')}
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      {t('Cancel')}
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Modal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                size="md"
              >
                <ModalOverlay className={styles.blurred} />
                <ModalContent
                  margin={'auto'}
                  borderRadius="17px"
                  padding={'0.3em'}
                  borderColor={formBorder}
                  backgroundColor={postBackground}
                  borderWidth="2px"
                  display={'flex'}
                >
                  <ModalHeader fontSize="lg" fontWeight="bold">
                    {t('Delete Post')}
                  </ModalHeader>

                  <ModalBody>
                    {t('Are you sure you want to delete this post? This action cannot be undone.')}
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => setIsConfirmOpen(false)}>{t('Cancel')}</Button>
                    <Button colorScheme="red" onClick={handlePostDelete} ml={3}>
                      {t('delete')}
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
                          <Text paddingTop={3} marginLeft={'1'}>
                            {post.content}
                          </Text>
                          {User.auth.id === post.user.id ? (
                            <Button
                              colorScheme="red"
                              size="sm"
                              borderRadius="50px"
                              onClick={() => handleDeleteClick(post.id)}
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
                              style={{ maxHeight: '60%' }}
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
              <Divider
                orientation="vertical"
                height="100%"
                width="1px"
                color={formBorder}
                display={{ base: 'none', md: 'block' }}
              />
              <Box width={'30%'} display={{ base: 'none', md: 'block' }}>
                <Text
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '300',
                    textAlign: 'center',
                    backgroundColor: useColorModeValue('gray.100', 'gray.700'),
                    padding: '1rem',
                    marginBottom: '1rem',
                    borderRadius: '20px',
                    borderColor: useColorModeValue('#5D616736', '#E2E8F01E'),
                    borderWidth: '2px',
                  }}
                >
                  <b> {t('openJobsForYou')} </b>
                </Text>
                <Box
                  style={{
                    // border: '1px solid',
                    borderColor: useColorModeValue('#5D616736', '#E2E8F01E'),
                    borderRadius: '18px',
                  }}
                >
                  {jobListing.map((job, index) => (
                    <Fragment key={index}>
                      {User.auth.id !== job.user.id ? (
                        <HoverableGrid
                          w="100%"
                          minW={{ base: 'unset', sm: '100vh' }}
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
                              {!job.coverLetter && !job.transcript && (
                                <Button
                                  colorScheme="gray"
                                  // border={useColorModeValue('gray.200', 'gray.600')}
                                  borderWidth="3px"
                                  size="sm"
                                  p={4}
                                  borderRadius="50px"
                                  onClick={(event) => handleSubmit(event, job.id)}
                                >
                                  {t('Quick Apply')}
                                </Button>
                              )}
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
                              <chakra.p>🤑 ‎ ‎ {t('salary')}: ${job.salary}/hr</chakra.p>
                              <chakra.p>
                                🏫 ‎ ‎ {t('transcript')} ‎ ‎
                                {job.transcript.toString() == 'true' ? '✅' : '❌'}
                              </chakra.p>
                              <chakra.p>
                                💌 ‎ ‎ {t('coverLetter')} ‎ ‎
                                {job.coverLetter.toString() == 'true' ? '✅' : '❌'}
                              </chakra.p>
                            </Grid>
                          </Box>
                        </HoverableGrid>
                      ) : null}

                      {jobListing.length - 1 !== index && <Divider m={0} />}
                    </Fragment>
                  ))}
                </Box>
              </Box>
            </HStack>
          </Box>
        </Box>
        <div style={{ marginBottom: '3rem' }}></div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Home
