/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Spacer,
  Stack,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import router from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
// Here we have used react-icons package for the icons

import { useTranslation } from 'next-i18next'

import { BsFilter } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { deleteJobListing, getOpenJobs } from './api/api'

const myListings = () => {
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
        firstName: 'Uzair',
        lastName: 'Ali',
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
  const { t } = useTranslation('common')

  useEffect(() => {
    const viewOpenJobs = async () => {
      // Get token from local storage
      const token = localStorage.getItem('jwt')
      try {
        // Call API function to get open jobs

        const response = await getOpenJobs(token)

        // Update state with fetched data
        setJobListing(response.data)
      } catch (error) {
        console.error(error)
        toast.error(t('errorJobs'))
      }
    }
    viewOpenJobs()
  }, [])

  const handleFilter = (value) => {
    // your logic to filter the list goes here
    console.log(value)
  }
  function handleCheckboxChange(event) {
    const isChecked = event.target.checked
    // Perform the necessary actions based on the isChecked value
    if (isChecked) {
      console.log('Filtering ...')
      // code to filter jobs
    } else {
      console.log('Not filtering.')
      // code to remove
    }
  }

  const [checkedItems, setCheckedItems] = React.useState([
    false,
    false,
    false,
    false,
  ])

  const allChecked = checkedItems.every(Boolean)
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked

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
  })
  const currentUser = useSelector((state) => state as any)
  useEffect(() => {
    setPic({
      coverPic: currentUser.auth.coverPic,
      profilePic: currentUser.auth.profilePic,
    })
  }, [currentUser])
  const userToken =
    typeof window !== 'undefined' ? localStorage.getItem('jwt') : null
  return (
    <>
      <Layout>
        <NavBar />
        <Container maxW="5xl" p={{ base: 10, md: 0 }} data-testid="myListings">
          <Flex justify="left" mb={3}>
            <HStack
              style={{
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              {/* a profile picture image here */}
              <img
                src={
                  Pic.profilePic
                    ? `data:image/jpeg;base64,${Pic.profilePic}`
                    : profile.image
                }
                alt="Segun Adebayo"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '1em',
                }}
              />
              <chakra.h3
                fontSize="4xl"
                fontWeight="bold"
                textAlign="center"
                paddingBottom={'0.2em'}
              >
                {t('myListings')}
              </chakra.h3>
              <Spacer />
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<Icon as={BsFilter} w={8} h={8} />}
                  variant="outline"
                  padding={'1.5em'}
                  rounded={'full'}
                >
                  {t('filterList')}
                </MenuButton>
                <MenuList borderRadius={'20px'} marginTop={1}>
                  <MenuItem onClick={() => handleFilter('option1')}>
                    {t('sortNewest')}
                  </MenuItem>
                  <MenuItem onClick={() => handleFilter('option2')}>
                    {t('sortHighestSalary')}
                  </MenuItem>

                  <Checkbox
                    paddingTop={1}
                    pl={3}
                    paddingBottom={1}
                    isChecked={allChecked}
                    isIndeterminate={isIndeterminate}
                    onChange={(e) =>
                      setCheckedItems([
                        e.target.checked,
                        e.target.checked,
                        e.target.checked,
                        e.target.checked,
                      ])
                    }
                  >
                    {t('viewAll')}
                  </Checkbox>
                  <Stack pl={7} mt={1} spacing={1}>
                    <Checkbox
                      isChecked={checkedItems[0]}
                      onChange={(e) =>
                        setCheckedItems([
                          e.target.checked,
                          checkedItems[1],
                          checkedItems[2],
                          checkedItems[3],
                        ])
                      }
                    >
                      {t('fullTime')}
                    </Checkbox>
                    <Checkbox
                      isChecked={checkedItems[1]}
                      onChange={(e) =>
                        setCheckedItems([
                          checkedItems[0],
                          e.target.checked,
                          checkedItems[2],
                          checkedItems[3],
                        ])
                      }
                    >
                      {t('partTime')}
                    </Checkbox>
                    <Checkbox
                      isChecked={checkedItems[2]}
                      onChange={(e) =>
                        setCheckedItems([
                          checkedItems[0],
                          checkedItems[1],
                          e.target.checked,
                          checkedItems[3],
                        ])
                      }
                    >
                      {t('internship')}
                    </Checkbox>
                    <Checkbox
                      isChecked={checkedItems[3]}
                      onChange={(e) =>
                        setCheckedItems([
                          checkedItems[0],
                          checkedItems[1],
                          checkedItems[2],
                          e.target.checked,
                        ])
                      }
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
            {jobListing.map((job, index) => (
              <Fragment key={index}>
                {currentUser.auth.id === job.user.id ? (
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

                      <chakra.p
                        fontWeight="normal"
                        fontSize="sm"
                        color={useColorModeValue('gray.600', 'gray.300')}
                        style={{
                          paddingTop: '1.0em',
                        }}
                      >
                        📍 {job.location}
                      </chakra.p>
                      <chakra.p
                        fontWeight="normal"
                        fontSize="sm"
                        color={useColorModeValue('gray.600', 'gray.300')}
                        style={{
                          paddingTop: '0.5em',
                        }}
                      >
                        💼 ‎
                        {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
                      </chakra.p>
                      <chakra.p
                        fontWeight="bold"
                        fontSize="sm"
                        color={useColorModeValue('gray.600', 'gray.300')}
                        style={{
                          paddingTop: '0.5em',
                        }}
                      >
                        ✅ ‎ # of Applications: {}
                        <button>
                          <Link
                            href={`/jobListing/${job.id}`}
                            color={useColorModeValue('blue.500', 'blue.300')}
                          >
                            View All
                          </Link>
                        </button>
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
                        📅 ‎ ‎ {t('startingDate')}: {job.startDate.split('T')[0]}
                      </chakra.p>
                      <chakra.p>
                        🤑 ‎ ‎ {t('salary')}: ${job.salary}/hr
                      </chakra.p>
                      <chakra.p>
                        🏫 ‎ ‎ {t('transcript')} ‎ ‎
                        {job.transcript.toString() == 'true' ? '✅' : '❌'}
                      </chakra.p>
                      <chakra.p>
                        💌 ‎ ‎ {t('coverLetter')} ‎ ‎
                        {job.coverLetter.toString() == 'true' ? '✅' : '❌'}
                      </chakra.p>
                    </VStack>
                    <Stack
                      spacing={6}
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
                        colorScheme={'blue'}
                        outline={'solid 1px'}
                        outlineColor={useColorModeValue('gray.400', 'gray.600')}
                        onClick={() => {
                          router.push(`/jobListing/${job.id}`)
                        }}
                      >
                        {t('editListing')}
                      </Button>
                      <Button
                        as={Link}
                        _hover={{ bg: useColorModeValue('gray.400', 'gray.600') }}
                        p={5}
                        colorScheme="red"
                        rounded="100px"
                        outline={'solid 1px'}
                        outlineColor={useColorModeValue('gray.400', 'gray.600')}
                        onClick={async () => {
                          const token = localStorage.getItem('jwt')
                          try {
                            await deleteJobListing(token, job.id)
                            setJobListing(jobListing.filter((a) => a.id !== job.id))
                            toast.success('Job listing deleted successfully!')
                          } catch (error) {
                            console.error(error)
                            toast.error('Error withdrawing application')
                          }
                        }}
                      >
                        Delete Application
                      </Button>
                    </Stack>
                  </Grid>
                ) : null}

                {jobListing.length - 1 !== index && <Divider m={0} />}
              </Fragment>
            ))}
          </VStack>
        </Container>
      </Layout>
    </>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default myListings
