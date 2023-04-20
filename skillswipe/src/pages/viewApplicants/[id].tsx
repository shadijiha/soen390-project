/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  VStack,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'
import router, { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
// Here we have used react-icons package for the icons

import { useTranslation } from 'next-i18next'

import { BsFilter } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  deleteJobListing,
  getJobApplicants,
  getMyApplications,
  getOpenJobs,
} from '../api/api'
const handleApplicationsClick = (jobId) => {
  // Here, you can implement your navigation or any other action needed
  router.push('/') // Navigates the user to the home page
}

// api result:
// [
//   {
//     "id": 25,
//     "externalUrl": "https://www.linkedin.com/in/saleemusama/",
//     "jobTitle": "thirdparty",
//     "companyName": "test",
//     "location": "test",
//     "jobDescription": "hey",
//     "salary": "34",
//     "jobType": "part-time",
//     "startDate": "2023-04-21T04:00:00.000Z",
//     "coverLetter": false,
//     "transcript": false,
//     "created_at": "2023-04-18T20:50:19.339Z",
//     "updated_at": "2023-04-18T20:50:19.339Z",
//     "applications": [
//       {
//         "id": 35,
//         "name": "Usama2 Saleem",
//         "email": "usama.saleem9@hotmail.com",
//         "phone": "5149692059",
//         "cv": null,
//         "coverLetter": null,
//         "created_at": "2023-04-19T22:31:43.747Z"
//       },
//       {
//         "id": 36,
//         "name": "Usama2 Saleem",
//         "email": "usama.saleem9@hotmail.com",
//         "phone": "5149692059",
//         "cv": null,
//         "coverLetter": null,
//         "created_at": "2023-04-19T22:31:53.137Z"
//       },
//       {
//         "id": 37,
//         "name": "Usama2 Saleem",
//         "email": "usama.saleem9@hotmail.com",
//         "phone": "5149692059",
//         "cv": null,
//         "coverLetter": null,
//         "created_at": "2023-04-19T23:09:39.705Z"
//       },
//       {
//         "id": 38,
//         "name": "Usama2 Saleem",
//         "email": "usama.saleem9@hotmail.com",
//         "phone": "5149692059",
//         "cv": null,
//         "coverLetter": null,
//         "created_at": "2023-04-19T23:09:40.549Z"
//       }
//     ]
//   },
//   {
//     "id": 32,
//     "externalUrl": "https://www.linkedin.com/in/saleemusama/",
//     "jobTitle": "Twitter Intern",
//     "companyName": "Twitter",
//     "location": "Montreal Canada",
//     "jobDescription": "d",
//     "salary": "3",
//     "jobType": "full-time",
//     "startDate": "2023-04-08T04:00:00.000Z",
//     "coverLetter": false,
//     "transcript": false,
//     "created_at": "2023-04-20T00:05:32.785Z",
//     "updated_at": "2023-04-20T00:05:32.785Z",
//     "applications": []
//   }
// ]

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
          <Avatar size="2xl" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <Text fontSize="xl" fontWeight="bold" marginTop="10px">
            logged in recruiter name
          </Text>
        </Box>

        <VStack>
          {jobs.map((job) => (
            <Fragment key={job.id}>
              <Box
                borderWidth={1}
                borderRadius="25px"
                p={6}
                minWidth={'70%'}
                marginBottom={'20px'}
              >
                <chakra.h2
                  fontWeight="bold"
                  fontSize="xl"
                  color={useColorModeValue('gray.700', 'white')}
                  marginBottom={'20px'}
                >
                  Job Title: {job.jobTitle}
                </chakra.h2>
                {job.applications.length > 0 ? (
                  job.applications.map((applicant) => (
                    <Box
                      key={applicant.id}
                      borderWidth={1}
                      borderRadius="20px"
                      p={4}
                      backgroundColor={useColorModeValue('gray.100', 'gray.700')}
                      marginBottom={'20px'}
                      alignContent={'start'}
                      alignItems={'start'}
                      textAlign={'start'}
                    >
                      <chakra.h3
                        fontWeight="bold"
                        fontSize="lg"
                        color={useColorModeValue('gray.700', 'white')}
                        paddingBottom={'10px'}
                      >
                        Applicant name: {applicant.name}
                        <Spacer />
                      </chakra.h3>
                      <VStack
                        alignContent={'start'}
                        alignItems={'start'}
                        textAlign={'start'}
                      >
                        <Flex>
                          <Text>Email: {applicant.email}</Text>
                          <Spacer />
                        </Flex>
                        <Flex>
                          <Text>Phone: {applicant.phone}</Text>
                          <Spacer />
                        </Flex>
                        <Flex>
                          <Text>
                            Applied:{' '}
                            {new Date(applicant.created_at).toLocaleDateString()}
                          </Text>
                          <Spacer />
                        </Flex>
                      </VStack>
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
