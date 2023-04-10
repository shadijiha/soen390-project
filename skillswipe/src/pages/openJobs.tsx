/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import {
  Box,
  Button,
  chakra,
  Checkbox,
  Container,
  Divider,
  Flex,
  Grid,
  HStack,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import router from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
// Here we have used react-icons package for the icons
import { useTranslation, withTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import error from 'next/error'
import { BsFilter } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { applyToJob, checkLogin, getOpenJobs } from './api/api'

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

const findJob = () => {
  const [jobListing, setJobListing] = useState<JobAttributes[]>([])
  const [initialJobListing, setInitalJobListing] = useState<JobAttributes[]>([])
  const [userId, setUserId] = useState(0)
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userCv, setUserCv] = useState('')
  const [userCover, setUserCover] = useState('')
  const [checked, setChecked] = useState(['full-time', 'part-time', 'contract', 'other']);

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
        toast.error(t('errorJobs'))
      }
    }
    viewOpenJobs()
  }, [])

  const handleFilter = (value) => {
    switch (value) {
      case 'option1':
        setJobListing(
          [...jobListing].sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          )
        )
        break
      case 'option2':
        setJobListing(
          [...jobListing].sort((a, b) => parseFloat(b.salary) - parseFloat(a.salary))
        )
        break
      default:
        break
    }
  }

 

  const filteredJobListing = jobListing.filter(job => checked.includes(job.jobType as string));

  const [checkedItems, setCheckedItems] = React.useState([
    false,
    false,
    false,
    false,
  ])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

  const { t } = useTranslation('common')

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
                💼 ‎ {t('openJobs')}
              </chakra.h3>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<Icon as={BsFilter} w={8} h={8} />}
                  variant="outline"
                  padding={'1.5em'}
                  rounded={'full'}
                >
                  {t('filterJobs')}
                </MenuButton>
                <MenuList borderRadius={'20px'} marginTop={1}>
                  <MenuItem onClick={() => handleFilter('option1')}>
                    {t('sortStartingDate')}
                  </MenuItem>
                  <MenuItem onClick={() => handleFilter('option2')}>
                    {t('sortHighestSalary')}
                  </MenuItem>

                  <Checkbox
                    paddingTop={1}
                    pl={3}
                    paddingBottom={1}
                    isChecked={checked.length === 4}
                    onChange={(e) => {
                      // Check or uncheck all checkboxes
                      if (e.target.checked) {
                        setChecked(['full-time', 'part-time', 'contract', 'other']);
                      } else {
                        setChecked([]);
                      }
                    }}
                  >
                    {t('viewAll')}
                  </Checkbox>
                  <Stack pl={7} mt={1} spacing={1}>
                    <Checkbox
                     isChecked={checked.includes('full-time')}
                     value="full-time"
                     onChange={(e) => {
                       // Add or remove value from checked array
                       if (e.target.checked) {
                         setChecked([...checked, e.target.value]);
                       } else {
                         setChecked(checked.filter((item) => item !== e.target.value));
                       }
                     }}
                    >
                      {t('fullTime')}
                    </Checkbox>
                    <Checkbox
                     isChecked={checked.includes('part-time')}
                     value="part-time"
                     onChange={(e) => {
                       // Add or remove value from checked array
                       if (e.target.checked) {
                         setChecked([...checked, e.target.value]);
                       } else {
                         setChecked(checked.filter((item) => item !== e.target.value));
                       }
                     }}
                    >
                      {t('partTime')}
                    </Checkbox>
                    <Checkbox
                      isChecked={checked.includes('contract')}
                      value="contract"
                      onChange={(e) => {
                        // Add or remove value from checked array
                        if (e.target.checked) {
                          setChecked([...checked, e.target.value]);
                        } else {
                          setChecked(checked.filter((item) => item !== e.target.value));
                        }
                      }}
                    >
                      {t('contract')}
                    </Checkbox>
                    <Checkbox
                       isChecked={checked.includes('other')}
                       value="other"
                       onChange={(e) => {
                         // Add or remove value from checked array
                         if (e.target.checked) {
                           setChecked([...checked, e.target.value]);
                         } else {
                           setChecked(checked.filter((item) => item !== e.target.value));
                         }
                       }}
                    >
                      {t('other')}
                    </Checkbox>
                  </Stack>
                </MenuList>
              </Menu>
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
            { checked.length > 0 ? (filteredJobListing.map((job, index) => (
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
                  <Box key={index} gridColumnEnd={{ base: 'span 2', md: 'unset' }}>
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

                      <chakra.h2 fontWeight="bold" fontSize="lg">
                        {job.companyName}
                      </chakra.h2>
                    </HStack>

                    <chakra.h3
                      as={Link}
                      isExternal
                      fontWeight="extrabold"
                      fontSize="2xl"
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
                      {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
                    </chakra.p>
                  </Box>
                  <VStack
                    spacing={{ base: 0, sm: 3 }}
                    alignItems="start"
                    fontWeight="light"
                    fontSize={{ base: 'xs', sm: 'sm' }}
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                    <chakra.p>
                      📅 {t('startingDate')}: {job.startDate.split('T')[0]}
                    </chakra.p>
                    <chakra.p>
                      🤑 {t('salary')}: ${job.salary}/hr
                    </chakra.p>
                    <chakra.p>
                      🏫 {t('transcript')}:{' '}
                      {job.transcript.toString() == 'true' ? t('yes') : t('no')}
                    </chakra.p>
                    <chakra.p>
                      💌 {t('coverLetter')}:{' '}
                      {job.coverLetter.toString() == 'true' ? t('yes') : t('no')}
                    </chakra.p>
                  </VStack>
                  <Stack
                    spacing={4}
                    direction={{ base: 'column', md: 'row' }}
                    fontSize={{ base: 'sm', md: 'md' }}
                    justifySelf="flex-end"
                    alignItems="center"
                  >
                    <div key={job.id}>
                      {/* quick apply job button */}
                      {!job.coverLetter && !job.transcript && (
                        <Button
                          as={Link}
                          _hover={{ bg: useColorModeValue('gray.400', 'gray.600') }}
                          rounded="100px"
                          outline={'solid 1px'}
                          colorScheme="green"
                          outlineColor={useColorModeValue('gray.400', 'gray.600')}
                          onClick={(event) => handleSubmit(event, job.id)}
                        >
                          Quick Apply
                        </Button>
                      )}
                    </div>
                    <Button
                      as={Link}
                      _hover={{ bg: useColorModeValue('gray.400', 'gray.600') }}
                      rounded="100px"
                      outline={'solid 1px'}
                      outlineColor={useColorModeValue('gray.400', 'gray.600')}
                      onClick={() => {
                        router.push(`/jobListing/${job.id}`)
                      }}
                    >
                      {t('apply')}
                    </Button>
                  </Stack>
                </Grid>
                {jobListing.length - 1 !== index && <Divider m={0} />}
              </Fragment>
            ))): ((jobListing.map((job, index) => (
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
                  <Box key={index} gridColumnEnd={{ base: 'span 2', md: 'unset' }}>
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

                      <chakra.h2 fontWeight="bold" fontSize="lg">
                        {job.companyName}
                      </chakra.h2>
                    </HStack>

                    <chakra.h3
                      as={Link}
                      isExternal
                      fontWeight="extrabold"
                      fontSize="2xl"
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
                      {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
                    </chakra.p>
                  </Box>
                  <VStack
                    spacing={{ base: 0, sm: 3 }}
                    alignItems="start"
                    fontWeight="light"
                    fontSize={{ base: 'xs', sm: 'sm' }}
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                    <chakra.p>
                      📅 {t('startingDate')}: {job.startDate.split('T')[0]}
                    </chakra.p>
                    <chakra.p>
                      🤑 {t('salary')}: ${job.salary}/hr
                    </chakra.p>
                    <chakra.p>
                      🏫 {t('transcript')}:{' '}
                      {job.transcript.toString() == 'true' ? t('yes') : t('no')}
                    </chakra.p>
                    <chakra.p>
                      💌 {t('coverLetter')}:{' '}
                      {job.coverLetter.toString() == 'true' ? t('yes') : t('no')}
                    </chakra.p>
                  </VStack>
                  <Stack
                    spacing={4}
                    direction={{ base: 'column', md: 'row' }}
                    fontSize={{ base: 'sm', md: 'md' }}
                    justifySelf="flex-end"
                    alignItems="center"
                  >
                    <div key={job.id}>
                      {/* quick apply job button */}
                      {!job.coverLetter && !job.transcript && (
                        <Button
                          as={Link}
                          _hover={{ bg: useColorModeValue('gray.400', 'gray.600') }}
                          rounded="100px"
                          outline={'solid 1px'}
                          colorScheme="green"
                          outlineColor={useColorModeValue('gray.400', 'gray.600')}
                          onClick={(event) => handleSubmit(event, job.id)}
                        >
                          Quick Apply
                        </Button>
                      )}
                    </div>
                    <Button
                      as={Link}
                      _hover={{ bg: useColorModeValue('gray.400', 'gray.600') }}
                      rounded="100px"
                      outline={'solid 1px'}
                      outlineColor={useColorModeValue('gray.400', 'gray.600')}
                      onClick={() => {
                        router.push(`/jobListing/${job.id}`)
                      }}
                    >
                      {t('apply')}
                    </Button>
                  </Stack>
                </Grid>
                {jobListing.length - 1 !== index && <Divider m={0} />}
              </Fragment>
            ) )))}
          </VStack>
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default withTranslation('common')(findJob)
