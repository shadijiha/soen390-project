/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
import NavBar from '@/components/NavBar'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { createJob } from './api/api'

const postJob = () => {
  const [postListing, setJobListing] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobDescription: '',
    salary: 0,
    skills: '',
    startDate: '',
    jobType: '',
    coverLetter: true,
    transcript: true,
    id: 0,
  })

  const addListing = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()

    console.log(postListing)

    if (
      !postListing.jobTitle ||
      !postListing.companyName ||
      !postListing.location ||
      !postListing.jobDescription ||
      !postListing.salary ||
      !postListing.skills ||
      !postListing.startDate ||
      !postListing.jobType ||
      !postListing.coverLetter ||
      !postListing.transcript
    ) {
      toast('Please fill all the fields')
      return
    } else {
      // forcing salary to be int
      const salary = parseInt(postListing.salary.toString(), 10)
      postListing.salary = salary

      createJob(token, postListing).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success('Sucessfully created job listing. Happy hiring!')
        } else {
          toast.error(
            'Error creating job listing. Maybe your usertype is not recruiter?'
          )
        }
      })
    }
  }

  return (
    <>
      <NavBar />
      <div data-testid="post-job">
        <Container maxW="5xl" paddingBottom={8}>
          <VStack spacing={3} w="100%" paddingBottom={'3em'}>
            <Image
              src="https://img.icons8.com/3d-fluency/256/user-group-man-woman.png"
              alt="Job Listing Image"
              width={'80px'}
            ></Image>

            <Text
              style={{
                fontWeight: 700,
                fontSize: '1.5rem',
                textShadow: '0px 0px 10px #00000010',
                paddingBottom: '0.2em',
              }}
            >
              Create Job Listing
            </Text>
          </VStack>
          <Box
            border={'1px'}
            borderColor={'#E5EAF061'}
            borderRadius={'40px'}
            padding={'4em'}
            w="100%"
            boxShadow={'0px 0px 10px #00000010'}
            marginBottom={'3em'}
          >
            <VStack spacing={'2.5em'} w="100%">
              <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
                <FormControl id="jobTitle">
                  <FormLabel htmlFor="jobTitle">Position Title</FormLabel>
                  <Input
                    onChange={(event) =>
                      setJobListing({ ...postListing, jobTitle: event.target.value })
                    }
                    name="jobTitle"
                    id="jobTitle"
                    type="text"
                    placeholder="ex: FullStack Software Engineer"
                    rounded="100px"
                  />
                </FormControl>
                <FormControl id="companyName">
                  <FormLabel htmlFor="companyName">Company</FormLabel>
                  <Input
                    onChange={(event) =>
                      setJobListing({
                        ...postListing,
                        companyName: event.target.value,
                      })
                    }
                    name="companyName"
                    id="companyName"
                    type="text"
                    placeholder="ex: Microsoft"
                    rounded="100px"
                  />
                </FormControl>
                <FormControl id="location">
                  <FormLabel htmlFor="location">Location</FormLabel>
                  <Input
                    onChange={(event) =>
                      setJobListing({ ...postListing, location: event.target.value })
                    }
                    name="location"
                    id="location"
                    type="text"
                    rounded="100px"
                    placeholder="ex: Montreal, QC or Remote"
                  />
                </FormControl>
              </Stack>

              <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
                <FormControl paddingRight={{ sm: 0, md: 10 }} id="salary">
                  <FormLabel htmlFor="salary">Salary (/hr)</FormLabel>
                  <Input
                    onChange={(event) =>
                      setJobListing({
                        ...postListing,
                        salary: parseInt(event.target.value),
                      })
                    }
                    name="salary"
                    id="salary"
                    type="text"
                    placeholder="as hourly salary (ex: 20)"
                    rounded="100px"
                  />
                </FormControl>
                <FormControl as="fieldset">
                  <FormLabel as="legend" paddingBottom={1.5}>
                    Job Type
                  </FormLabel>
                  <RadioGroup
                    onChange={(value) =>
                      setJobListing({ ...postListing, jobType: value })
                    }
                  >
                    <HStack spacing="auto">
                      <Radio value="full-time">Full-time</Radio>
                      <Radio value="part-time">Part-time</Radio>
                      <Radio value="contract">Contract</Radio>
                      <Radio value="other">Other</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </Stack>

              <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
                <FormControl as="fieldset">
                  <FormLabel as="legend" paddingBottom={1.5}>
                    Cover Letter Required?
                  </FormLabel>
                  <RadioGroup
                    onChange={(value) =>
                      setJobListing({ ...postListing, coverLetter: Boolean(value) })
                    }
                  >
                    <HStack spacing="10%">
                      <Radio value="true">Yes</Radio>
                      <Radio value="false">No</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
                <FormControl as="fieldset">
                  <FormLabel as="legend" paddingBottom={1.5}>
                    Transcript Required?
                  </FormLabel>
                  <RadioGroup
                    onChange={(value) =>
                      setJobListing({ ...postListing, transcript: Boolean(value) })
                    }
                  >
                    <HStack spacing="10%">
                      <Radio value="true">Yes</Radio>
                      <Radio value="false">No</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>

                <FormControl id="startDate">
                  <FormLabel htmlFor="startDate">Starting Date</FormLabel>
                  <Input
                    type="date"
                    rounded="100px"
                    id="startDate"
                    name="startDate"
                    onChange={(event) =>
                      setJobListing({
                        ...postListing,
                        startDate: event.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="skills">
                  <FormLabel htmlFor="skills">Skills Needed</FormLabel>
                  <Input
                    onChange={(event) =>
                      setJobListing({ ...postListing, skills: event.target.value })
                    }
                    name="skills"
                    id="skills"
                    type="text"
                    rounded="100px"
                    placeholder="Separate with comma (e.g React, NextJS, ChakraUI)"
                  />
                </FormControl>
              </Stack>

              <FormControl
                id="jobDescription"
                style={{
                  paddingBottom: '1.5em',
                }}
              >
                <FormLabel htmlFor="jobDescription">Job Description</FormLabel>
                <Textarea
                  name="jobDescription"
                  id="jobDescription"
                  size="lg"
                  placeholder="Paste here"
                  rounded="15px"
                  onChange={(event) =>
                    setJobListing({
                      ...postListing,
                      jobDescription: event.target.value,
                    })
                  }
                />
              </FormControl>
              <Button
                onClick={addListing}
                size={'lg'}
                bg="green.300"
                color="white"
                _hover={{
                  bg: 'green.500',
                }}
                borderRadius="300px"
                w={{ base: '100%', md: '150px' }}
                textShadow="0px 0px 20px #00000076"
                shadow={'0px 4px 30px #0000001F'}
              >
                Create
              </Button>
            </VStack>
          </Box>
        </Container>
      </div>
    </>
  )
}

export default postJob
