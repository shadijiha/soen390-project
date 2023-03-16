
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
import { BsFilter } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { getOpenJobs, viewJob } from './api/api'

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
      } catch (error) {
        console.error(error)
        toast.error('Error getting jobs')
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
                💼 ‎ Open Jobs
              </chakra.h3>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<Icon as={BsFilter} w={8} h={8} />}
                  variant="outline"
                  padding={'1.5em'}
                  rounded={'full'}
                >
                  Filter Jobs
                </MenuButton>
                <MenuList borderRadius={'20px'} marginTop={1}>
                  <MenuItem onClick={() => handleFilter('option1')}>
                    Sort by Starting Date
                  </MenuItem>
                  <MenuItem onClick={() => handleFilter('option2')}>
                    Sort by Highest Salary
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
                    View All
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
                      Full Time
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
                      Part Time
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
                      Internship
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
                      Other
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
                        href={`/jobListing/${job.id}`}
                        isExternal
                        fontWeight="bold"
                        fontSize="lg"
                      >
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
      </Layout>
    </>
  )
}

const JobSettingLink = ({ label }: { label: string }) => {
  return (
    <Button
      as={Link}
      _hover={{ bg: useColorModeValue('gray.400', 'gray.600') }}
      p={5}
      rounded="100px"
      outline={'solid 1px'}
      outlineColor={useColorModeValue('gray.400', 'gray.600')}
    >
      {label}
    </Button>
  )
}

export default findJob
