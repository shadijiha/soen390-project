/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
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
  Icon,
  Image,
  Link,
  Stack,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { Fragment, useEffect, useState } from 'react'
// Here we have used react-icons package for the icons
import { IconType } from 'react-icons'
import { FaRegEye } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { getOpenJobs } from './api/api'

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

const findJob = () => {
  const [jobListing, setJobListing] = useState<JobAttributes[]>([])

  useEffect(() => {
    const viewOpenJobs = async () => {
      // Get token from local storage
      const token = localStorage.getItem('jwt')

      try {
        // Call API function to get open jobs
        const response = await getOpenJobs(token)

        // Update state with fetched data
        setJobListing(response.data)

        // Show toast notification
        toast.success('API Request success')
      } catch (error) {
        console.error(error)
        toast.error('Error getting jobs')
      }
    }
    viewOpenJobs()
  }, [])
  return (
    <>
      <NavBar />

      <Container maxW="5xl" p={{ base: 10, md: 0 }}>
        <Flex justify="left" mb={3}>
          <chakra.h3
            fontSize="4xl"
            fontWeight="bold"
            textAlign="center"
            paddingBottom={'0.2em'}
          >
            💼 ‎ Open Jobs
          </chakra.h3>
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
          {jobListing.map((job, index) => (
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
                      src={`http://www.${job.companyName.toLowerCase()}.com/favicon.ico`}
                      width="20px"
                      height="20px"
                      alt="logo"
                      onError={(e) => {
                        // show a default image if the company logo is not found
                        e.currentTarget.src =
                          'https://img.icons8.com/3d-fluency/512/hard-working.png'
                      }}
                    />

                    <chakra.h2
                      as={Link}
                      href={job.jobTitle}
                      isExternal
                      fontWeight="bold"
                      fontSize="lg"
                    >
                      {job.companyName}
                    </chakra.h2>
                  </HStack>

                  <chakra.h3
                    as={Link}
                    href={job.jobTitle}
                    isExternal
                    fontWeight="extrabold"
                    fontSize="2xl"
                  >
                    {job.jobTitle}
                  </chakra.h3>
                  <br />

                  <chakra.p
                    fontWeight="bold"
                    fontSize="sm"
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                    {job.location}
                  </chakra.p>
                  <chakra.p
                    fontWeight="bold"
                    fontSize="sm"
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                    Position: {job.jobType}
                  </chakra.p>
                </Box>
                <VStack
                  spacing={{ base: 0, sm: 3 }}
                  alignItems="start"
                  fontWeight="medium"
                  fontSize={{ base: 'xs', sm: 'sm' }}
                  color={useColorModeValue('gray.600', 'gray.300')}
                >
                  <chakra.p
                    fontWeight="medium"
                    fontSize="sm"
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                    {/* format the starting date to be only year month and date */}
                    📅 ‎ ‎ Starting Date: {job.startDate.split('T')[0]}
                  </chakra.p>
                  <chakra.p
                    fontWeight="medium"
                    fontSize="sm"
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                    🤑 ‎ ‎ Salary: ${job.salary}/hr
                  </chakra.p>

                  <chakra.p
                    fontWeight="medium"
                    fontSize="sm"
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                    🏫 ‎ ‎ Transcript Needed?{' '}
                    {job.transcript.toString() == 'true' ? '✅' : '❌'}
                  </chakra.p>
                  <chakra.p
                    fontWeight="medium"
                    fontSize="sm"
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                    💌 ‎ ‎ Cover Letter Needed?{' '}
                    {job.coverLetter.toString() == 'true' ? '✅' : '❌'}
                  </chakra.p>
                </VStack>
                <Stack
                  spacing={2}
                  direction="row"
                  fontSize={{ base: 'sm', sm: 'md' }}
                  justifySelf="flex-end"
                  alignItems="center"
                >
                  {['Apply'].map((label, index) => (
                    <JobSettingLink key={index} label={label} />
                  ))}
                </Stack>
              </Grid>
              {jobListing.length - 1 !== index && <Divider m={0} />}
            </Fragment>
          ))}
        </VStack>
      </Container>
    </>
  )
}

// const JobStat = ({ icon, value }: { icon: IconType; value: number }) => {
//   return (
//     <Flex p={1} alignItems="center">
//       <Icon as={icon} w={5} h={5} mr={2} />
//       <chakra.span> {value} </chakra.span>
//     </Flex>
//   )
// }

const JobSettingLink = ({ label }: { label: string }) => {
  return (
    <Button
      as={Link}
      _hover={{ bg: useColorModeValue('gray.400', 'gray.600') }}
      p={5}
      rounded="100px"
    >
      {label}
    </Button>
  )
}

export default findJob
