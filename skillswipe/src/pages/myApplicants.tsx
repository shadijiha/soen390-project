/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Spacer,
  Text,
  VStack,
  chakra,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react'
import router, { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
// Here we have used react-icons package for the icons

import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { DownloadIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { checkLogin, getJobApplicants } from './api/api'
const handleApplicationsClick = (jobId) => {
  // Here, you can implement your navigation or any other action needed
  router.push('/') // Navigates the user to the home page
}

type JobApplicantType = {
  id: number
  externalUrl: string
  jobTitle: string
  companyName: string
  location: string
  jobDescription: string
  salary: string
  jobType: string
  startDate: string
  coverLetter: boolean
  transcript: boolean
  created_at: string
  updated_at: string
  applications: Array<{
    profilePic: any
    id: number
    name: string
    email: string
    phone: string
    cv: string | null
    coverLetter: string | null
    created_at: string
  }>
}

const myApplicants = () => {
  const [isMobile] = useMediaQuery('(max-width: 766px)')
  // Get the jobId from the URL using useRouter
  const router = useRouter()
  const { jobId } = router.query

  // Initialize empty jobApplicant state of type JobApplicantType | null
  const [jobApplicant, setJobApplicant] = useState<JobApplicantType | null>(null)
  const [jobs, setJobs] = useState<Array<JobApplicantType>>([])
  const [refetch, setRefetch] = useState(false)
  const { t } = useTranslation('common')

  useEffect(() => {
    const getApplicants = async () => {
      console.log('getting applicants')
      // Get token from local storage
      const token = localStorage.getItem('jwt')
      try {
        // Call API function to get all jobs and applicants
        const responseApplicants = await getJobApplicants(token)

        // Set jobs state with the response data
        setJobs(responseApplicants.data)

        console.log(responseApplicants)
      } catch (error) {
        console.error(error)
        toast.error(t('errorJobs'))
      }
    }
    getApplicants()
  }, [refetch])

  // When the jobId from the URL changes, this useEffect will run
  useEffect(() => {
    if (jobId) {
      setRefetch((prevRefetch) => !prevRefetch)
    }
  }, [jobId])
  const HoverableGrid = ({ children, ...props }) => {
    return (
      <Grid
        _hover={{
          boxShadow: '0 0 0 2px #3182ce',
          borderRadius: '18px',
          // maxWidth: '50%',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {children}
      </Grid>
    )
  }

  const [profile] = useState({
    name: 'John Smith',
    title: 'Software Engineer',
    location: 'Montreal, QC, CA',
    school: 'Concordia University',
    experience: 'Five years of experience in full stack development',
    experience2: 'Three years of experience in mobile development',
    experience3: 'Two years of experience in data analysis',
    image:
      'https://marketplace.canva.com/EAFKZzWYqqE/1/0/1600w/canva-purple-navy-neon-gradient-modern-minimalist-man-tiktok-profile-picture-kqzwo_88iLY.jpg',
    cover:
      'https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc',
  })
  const [Pic, setPic] = useState({
    profilePic: '',
    coverPic: '',
    name: '',
  })
  const currentUser = useSelector((state) => state as any)
  useEffect(() => {
    setPic({
      coverPic: currentUser.auth.coverPic,
      profilePic: currentUser.auth.profilePic,
      name: currentUser.auth.name,
    })
  }, [currentUser])
  const [userId, setUserId] = useState(0)
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userCv, setUserCv] = useState('')
  const [userCover, setUserCover] = useState('')
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

  const User = useSelector((state) => state as any)
  const callUser = (phone) => {
    window.open(`tel:${phone}`, '_blank')
  }

  const emailUser = (email) => {
    window.open(`mailto:${email}`, '_blank')
  }
  function downloadFile(cv: string | null, arg1: string): void {
    throw new Error('Function not implemented.')
  }

  return (
    <>
      <Layout>
        <NavBar />

        {/* logged in user's profile picture */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          marginBottom={'20px'}
        >
          <Avatar
            size="2xl"
            name="Dan Abrahmov"
            src={
              User.auth.profilePic
                ? `data:image/jpeg;base64,${User.auth.profilePic}`
                : profile.image
            }
          />
          <Text fontSize="xl" fontWeight="bold" marginTop="10px">
            {User.auth.firstName} {User.auth.lastName}
          </Text>
          <Text fontSize="md" fontWeight="normal" marginTop="10px">
            {t('recruiterPanel')}
          </Text>
        </Box>

        <VStack>
          {jobs.map((job) => (
            <Fragment key={job.id}>
              <Box
                borderWidth={'3px'}
                borderRadius="30px"
                p={6}
                minWidth={'70%'}
                marginBottom={'20px'}
                flex={1}
              >
                <HStack>
                  <img
                    src={`http://www.${job.companyName.toLowerCase()}.com/favicon.ico`}
                    width="30px"
                    height="30px"
                    alt="logo"
                    onError={(e) => {
                      // show a default image if the company logo is not found
                      e.currentTarget.src =
                        'https://img.icons8.com/3d-fluency/512/hard-working.png'
                    }}
                  />
                  <chakra.h2
                    fontWeight="normal"
                    fontSize="xl"
                    color={useColorModeValue('gray.700', 'white')}
                    marginBottom={'20px'}
                  >
                    {job.companyName}
                  </chakra.h2>
                </HStack>
                <chakra.h2
                  fontWeight="bold"
                  fontSize="xl"
                  color={useColorModeValue('gray.700', 'white')}
                  marginBottom={'20px'}
                >
                  {job.jobTitle}
                </chakra.h2>

                {job.applications.length > 0 ? (
                  job.applications.map((applicant) => (
                    <Box
                      key={applicant.id}
                      borderWidth={2}
                      borderRadius="20px"
                      p={7}
                      backgroundColor={useColorModeValue('gray.100', 'gray.800')}
                      marginBottom={'20px'}
                      flex={1}
                    >
                      <Flex paddingBottom={'15px'}>
                        {isMobile ? (
                          <VStack align={'end'} justify={'space-between'}>
                            <HStack>
                              <Avatar
                                size="md"
                                name="Dan Abrahmov"
                                src={
                                  applicant.profilePic
                                    ? `data:image/jpeg;base64,${applicant.profilePic}`
                                    : profile.image
                                }
                              />
                              <chakra.h3
                                fontWeight="bold"
                                fontSize="lg"
                                color={useColorModeValue('gray.700', 'white')}
                              >
                                {applicant.name}
                              </chakra.h3>
                            </HStack>
                            <Text>
                              <Badge colorScheme="green">
                                Applied:{' '}
                                {new Date(applicant.created_at).toLocaleDateString()}
                              </Badge>
                            </Text>
                            <Flex>
                              <chakra.h3
                                color={useColorModeValue('gray.700', 'white')}
                              >
                                <Text as="span" fontWeight="bold">
                                  Applicant ID:
                                </Text>{' '}
                                {applicant.id}
                              </chakra.h3>
                            </Flex>
                          </VStack>
                        ) : (
                          <HStack>
                            <Avatar
                              size="md"
                              name="Dan Abrahmov"
                              src={
                                applicant.profilePic
                                  ? `data:image/jpeg;base64,${applicant.profilePic}`
                                  : profile.image
                              }
                            />
                            <chakra.h3
                              fontWeight="bold"
                              fontSize="lg"
                              color={useColorModeValue('gray.700', 'white')}
                            >
                              {applicant.name}
                            </chakra.h3>
                            <Text>
                              <Badge colorScheme="green">
                                Applied:{' '}
                                {new Date(applicant.created_at).toLocaleDateString()}
                              </Badge>
                            </Text>
                            <Flex>
                              <chakra.h3
                                color={useColorModeValue('gray.700', 'white')}
                              >
                                <Text as="span" fontWeight="bold">
                                  Applicant ID:
                                </Text>{' '}
                                {applicant.id}
                              </chakra.h3>
                            </Flex>
                          </HStack>
                        )}
                        <Spacer />

                        {/* contact button that changes to call icon when in mobile view and email button when in desktop mode */}
                      </Flex>
                      {isMobile ? (
                        <VStack
                          // space it evenly and align it to the ends
                          align={'center'}
                          justify={'space-between'}
                        >
                          <VStack alignItems={'center'}>
                            <Flex paddingBottom={'3'}>
                              <Text
                                fontWeight="bold"
                                textColor={'green.600'}
                                backgroundColor={'green.100'}
                                // more padding on left and right than top and bottom
                                padding={'5px 15px 5px 15px'}
                                borderRadius={'5px'}
                                fontSize={'sm'}
                                border={'2px solid'}
                              >
                                Applicant Details
                              </Text>
                            </Flex>
                            <Flex>
                              <Text>{applicant.email}</Text>
                            </Flex>
                            <Flex>
                              <Text>{applicant.phone}</Text>
                            </Flex>
                            <Flex>
                              <Text>
                                Date Applied:{' '}
                                {new Date(applicant.created_at).toLocaleDateString()}
                              </Text>
                              <Spacer />
                            </Flex>
                          </VStack>
                          <VStack
                            alignContent={'end'}
                            alignItems={'end'}
                            textAlign={'end'}
                          >
                            <Button
                              onClick={() =>
                                isMobile
                                  ? callUser(applicant.phone)
                                  : emailUser(applicant.email)
                              }
                            >
                              <HStack>
                                {isMobile ? (
                                  <Icon as={PhoneIcon} />
                                ) : (
                                  <Icon as={EmailIcon} />
                                )}
                                {!isMobile && <Text>Contact</Text>}
                              </HStack>
                            </Button>{' '}
                            {/* // if applicant has a cv, show the download button
                          // if not, show the disabled button */}
                            {applicant.cv ? (
                              <Button
                                onClick={() =>
                                  downloadFile(
                                    applicant.cv,
                                    `${applicant.name} CV.pdf`
                                  )
                                }
                              >
                                <HStack>
                                  <Icon as={DownloadIcon} />
                                  <Text>Download CV</Text>
                                </HStack>
                              </Button>
                            ) : (
                              <Button isDisabled>
                                <HStack>
                                  <Icon as={DownloadIcon} />
                                  <Text>CV Not Submitted</Text>
                                </HStack>
                              </Button>
                            )}
                            {/* same for transcript */}
                            {applicant.coverLetter ? (
                              <VStack>
                                <Button
                                  onClick={() =>
                                    downloadFile(
                                      applicant.coverLetter,
                                      `${applicant.name} coverletter.pdf`
                                    )
                                  }
                                >
                                  <HStack>
                                    <Icon as={DownloadIcon} />
                                    <Text>View Cover Letter</Text>
                                  </HStack>
                                </Button>
                              </VStack>
                            ) : (
                              <VStack>
                                <Button isDisabled>
                                  <HStack>
                                    <Icon as={DownloadIcon} />
                                    <Text>Cover Letter Not Submitted</Text>
                                  </HStack>
                                </Button>
                              </VStack>
                            )}
                          </VStack>
                        </VStack>
                      ) : (
                        <HStack
                          // space it evenly and align it to the ends
                          align={'start'}
                          justify={'space-between'}
                        >
                          <VStack
                            alignContent={'start'}
                            alignItems={'start'}
                            textAlign={'start'}
                          >
                            <Flex paddingBottom={'3'}>
                              <Text
                                fontWeight="bold"
                                textColor={'green.600'}
                                backgroundColor={'green.100'}
                                // more padding on left and right than top and bottom
                                padding={'5px 15px 5px 15px'}
                                borderRadius={'5px'}
                                fontSize={'sm'}
                                border={'2px solid'}
                              >
                                Applicant Details
                              </Text>
                            </Flex>
                            <Flex>
                              <Text>{applicant.email}</Text>
                            </Flex>
                            <Flex>
                              <Text>{applicant.phone}</Text>
                            </Flex>
                          </VStack>
                          <VStack
                            alignContent={'end'}
                            alignItems={'end'}
                            textAlign={'end'}
                          >
                            <Button
                              onClick={() =>
                                isMobile
                                  ? callUser(applicant.phone)
                                  : emailUser(applicant.email)
                              }
                            >
                              <HStack>
                                {isMobile ? (
                                  <Icon as={PhoneIcon} />
                                ) : (
                                  <Icon as={EmailIcon} />
                                )}
                                {!isMobile && <Text>Contact</Text>}
                              </HStack>
                            </Button>{' '}
                            {/* // if applicant has a cv, show the download button
                          // if not, show the disabled button */}
                            {applicant.cv ? (
                              <Button
                                onClick={() =>
                                  downloadFile(
                                    applicant.cv,
                                    `${applicant.name} CV.pdf`
                                  )
                                }
                              >
                                <HStack>
                                  <Icon as={DownloadIcon} />
                                  <Text>Download CV</Text>
                                </HStack>
                              </Button>
                            ) : (
                              <Button isDisabled>
                                <HStack>
                                  <Icon as={DownloadIcon} />
                                  <Text>CV Not Submitted</Text>
                                </HStack>
                              </Button>
                            )}
                            {/* same for transcript */}
                            {applicant.coverLetter ? (
                              <VStack>
                                <Button
                                  onClick={() =>
                                    downloadFile(
                                      applicant.coverLetter,
                                      `${applicant.name} coverletter.pdf`
                                    )
                                  }
                                >
                                  <HStack>
                                    <Icon as={DownloadIcon} />
                                    <Text>View Cover Letter</Text>
                                  </HStack>
                                </Button>
                              </VStack>
                            ) : (
                              <VStack>
                                <Button isDisabled>
                                  <HStack>
                                    <Icon as={DownloadIcon} />
                                    <Text>Cover Letter Not Submitted</Text>
                                  </HStack>
                                </Button>
                              </VStack>
                            )}
                          </VStack>
                        </HStack>
                      )}
                    </Box>
                  ))
                ) : (
                  <Text>No applicants for this job.</Text>
                )}
              </Box>
            </Fragment>
          ))}
        </VStack>
      </Layout>
    </>
  )
}

export default myApplicants
