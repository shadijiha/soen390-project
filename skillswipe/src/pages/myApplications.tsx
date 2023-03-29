/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import {
  Box,
  Button,
  chakra,
  Container,
  Divider,
  Flex,
  Grid,
  HStack,
  Link,
  Stack,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import router from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getMyApplications } from './api/api'
import jobListing from './jobListing/[id]'
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
const MyApplications = () => {
  const [applications, setApplications] = useState<JobAttributes[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchApplications = async () => {
      const response = await getMyApplications(token)
      console.log(response.data)
      if (Array.isArray(response.data)) {
        // Add check here
        setApplications(response.data)
      }
      setIsLoading(false)
    }
    fetchApplications()
  }, [])

  return (
    <>
      <Layout>
        <NavBar />
        <Container maxW="5xl" p={{ base: 10, md: 0 }}>
          <Flex justify="left" mb={3}>
            <HStack
              style={{
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <chakra.h3
                fontSize="4xl"
                fontWeight="bold"
                textAlign="center"
                paddingBottom={'0.2em'}
              >
                🧑‍⚕️ ‎ My Applications
              </chakra.h3>
            </HStack>
          </Flex>
          <VStack
            shadow={{ base: 'none', md: 'md' }}
            border="1px solid"
            borderColor="gray.400"
            rounded="15px"
            overflow="hidden"
            spacing={0}
            marginBottom={'5em'}
          >
            {applications.map((application, index) => (
              <Fragment key={index}>
                <Grid
                  templateRows={{ base: 'auto auto', md: 'auto' }}
                  w="100%"
                  templateColumns={{ base: 'unset', md: '4fr 3fr 2fr' }}
                  p={{ base: 2, sm: 4 }}
                  gap={3}
                  alignItems="center"
                  _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                >
                  <Box gridColumnEnd={{ base: 'span 2', md: 'unset' }}>
                    <HStack spacing={3}>
                      <img
                        src={`http://www.${application.companyName.toLowerCase()}.com/favicon.ico`}
                        width="20px"
                        height="20px"
                        alt="logo"
                        onError={(e) => {
                          // show a default image if the company logo is not found
                          e.currentTarget.src =
                            'https://img.icons8.com/3d-fluency/512/hard-working.png'
                        }}
                      />

                      <chakra.h2 fontWeight="bold" fontSize="lg">
                        {application.companyName}
                      </chakra.h2>
                    </HStack>

                    <chakra.h3
                      as={Link}
                      isExternal
                      fontWeight="extrabold"
                      fontSize="2xl"
                      onClick={() => {
                        router.push(`/jobListing/${application.id}`)
                      }}
                    >
                      {application.jobTitle}
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
                      📍 {application.location}
                    </chakra.p>
                    <chakra.p
                      fontWeight="normal"
                      fontSize="sm"
                      color={useColorModeValue('gray.600', 'gray.300')}
                    >
                      💼 ‎
                      {application.jobType.charAt(0).toUpperCase() +
                        application.jobType.slice(1)}
                    </chakra.p>
                  </Box>
                  <VStack
                    spacing={{ base: 0, sm: 3 }}
                    alignItems="start"
                    fontWeight="light"
                    fontSize={{ base: 'xs', sm: 'sm' }}
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                    {/* By the way, the ‎ is an invisible space character */}
                    <chakra.p>
                      {/* format the starting date to be only year month and date */}
                      📅 ‎ ‎ Starting Date: {application.startDate.split('T')[0]}
                    </chakra.p>
                    <chakra.p>🤑 ‎ ‎ Salary: ${application.salary}/hr</chakra.p>
                    <chakra.p>
                      🏫 ‎ ‎ Transcript Needed? ‎ ‎
                      {application.transcript.toString() == 'true' ? '✅' : '❌'}
                    </chakra.p>
                    <chakra.p>
                      💌 ‎ ‎ Cover Letter Needed? ‎ ‎
                      {application.coverLetter.toString() == 'true' ? '✅' : '❌'}
                    </chakra.p>
                  </VStack>
                  <Stack
                    spacing={2}
                    direction="row"
                    fontSize={{ base: 'sm', sm: 'md' }}
                    justifySelf="flex-end"
                    alignItems="center"
                  >
                    <Button
                      as={Link}
                      _hover={{ bg: useColorModeValue('gray.400', 'gray.600') }}
                      p={5}
                      rounded="100px"
                      outline={'solid 1px'}
                      outlineColor={useColorModeValue('gray.400', 'gray.600')}
                      onClick={() => {
                        router.push(`/jobListing/${application.id}`)
                      }}
                    >
                      Apply
                    </Button>
                  </Stack>
                </Grid>
                {jobListing.length - 1 !== index && <Divider m={0} />}
              </Fragment>
            ))}
          </VStack>
        </Container>
      </Layout>
    </>
  )
}

export default MyApplications
