/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
import NavBar from '@/components/NavBar'
import {
  AspectRatio,
  Box,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
const postJob = () => {
  const [selectedJobType, setSelectedJobType] = useState('')

  return (
    <>
      <NavBar />
      <div data-testid="post-job">
        <Container maxW="5xl" paddingBottom={8}>
          <VStack spacing={6} w="100%">
            {/* add an image here */}

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
            <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
              {/* frontend!!! company is read only,
                 we will pull it from the user's logged in account 
                 and show it as the placeholder */}
              <FormControl id="jobTitle">
                <FormLabel>Position Title</FormLabel>
                <Input
                  type="text"
                  placeholder="ex: FullStack Software Engineer"
                  rounded="100px"
                />
              </FormControl>
              <FormControl id="company">
                <FormLabel>Company</FormLabel>
                <Input
                  readOnly
                  type="text"
                  placeholder="loggedInCompany"
                  rounded="100px"
                />
              </FormControl>
              <FormControl id="location">
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  rounded="100px"
                  placeholder="ex: Montreal, QC or Remote"
                />
              </FormControl>
            </Stack>

            <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
              <FormControl paddingRight={{ sm: 0, md: 10 }} id="salary">
                <FormLabel>Salary</FormLabel>
                <Input
                  type="text"
                  placeholder="ex: $50/hr or $100,000/year"
                  rounded="100px"
                />
              </FormControl>
              <FormControl as="fieldset">
                <FormLabel as="legend" paddingBottom={1.5}>
                  Job Type
                </FormLabel>
                <RadioGroup value={selectedJobType}>
                  <HStack spacing="auto">
                    <Radio value="fulltime">Full-time</Radio>
                    <Radio value="parttime">Part-time</Radio>
                    <Radio value="freelance">Freelance</Radio>
                    <Radio value="contract">Contract</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </Stack>

            <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
              <FormControl id="date">
                <FormLabel>Starting Date</FormLabel>
                <Input type="date" rounded="100px" />
              </FormControl>
              <FormControl id="skills">
                <FormLabel>Skills Needed</FormLabel>
                <Input
                  type="text"
                  rounded="100px"
                  placeholder="Separate with comma (e.g React, NextJS, ChakraUI)"
                />
              </FormControl>
            </Stack>

            <FormControl id="description">
              <FormLabel>Job Description</FormLabel>
              <Textarea size="lg" placeholder="Paste here" rounded="15px" />
            </FormControl>
          </VStack>
        </Container>
      </div>
    </>
  )
}

export default postJob
