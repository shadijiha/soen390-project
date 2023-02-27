/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { Fragment, useState } from 'react'
// Here we have used react-icons package for the icons
import NavBar from '@/components/NavBar'

interface ListingData {
  id: number
  label: string
  text: string
}

const ListingData: ListingData[] = [
  {
    id: 1,
    label: 'Job Type',
    text: 'Internship',
  },
  {
    id: 2,
    label: 'Location',
    text: 'Montreal, QC',
  },
  {
    id: 3,
    label: 'Salary',
    text: '50$/hr',
  },
]
const skillsArray = [
  'React',
  'Node',
  'Express',
  'MongoDB',
  'Python',
  'Java',
  'C++',
  'NextJS',
  'ChakraUI',
]

const JobListing = () => {
  return (
    <>
      <NavBar />
      <div data-testid="job-listing">
        <Container maxW="7xl" px={{ base: 5, md: 8 }}>
          <Stack spacing={10}>
            <Flex align="center" justify="center" direction="column">
              {/* Recruiter's profile picture here */}
              <image
                style={{
                  marginBottom: '8px',
                }}
              >
                <img
                  //recruiters profile picture
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                  width="50px"
                  alt="logo"
                />
              </image>
              {/* recruiters company name here that they made from the job listing creation page*/}
              <Heading fontSize="4xl" mb={5} fontWeight={200} letterSpacing={2}>
                Google
              </Heading>
              <Heading fontSize="4xl" mb={10} fontWeight={700}>
                Software Engineer Intern - Summer 2022
              </Heading>
              <Flex
                align="center"
                justify="center"
                direction="row"
                flexWrap={'wrap'}
                mx={'80px'}
              >
                {skillsArray.map((skill: any) => (
                  <Button
                    className="skill"
                    style={{
                      backgroundColor: 'transparent',
                      borderWidth: '2px',
                      textShadow: '0px 0px 30px #00000014',
                      fontWeight: 400,
                      marginRight: '1em',
                      borderRadius: '100px',
                      marginBottom: '1em',
                    }}
                  >
                    {skill}
                  </Button>
                ))}
              </Flex>

              {/* Top 3 boxes */}
              <Container maxW="5xl" paddingBottom={8}>
                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3 }}
                  spacing={5}
                  mt={5}
                  mb={2}
                >
                  {ListingData.map((data) => (
                    <Box
                      key={data.id}
                      p={5}
                      boxShadow="md"
                      rounded="36px"
                      borderWidth={2}
                    >
                      <Text
                        fontWeight="bold"
                        fontSize="x-large"
                        textAlign={'center'}
                      >
                        {data.text}
                      </Text>
                      <Text textAlign={'center'}>{data.label}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Container>
              <Divider />
            </Flex>
            <Flex align="left" direction="column">
              <Text
                mx={{ base: 25, sm: 3, md: 130 }}
                style={{
                  fontWeight: 600,
                  fontSize: '2rem',
                  textShadow: '0px 0px 10px #00000010',
                  paddingBottom: '0.5em',
                }}
              >
                Description
              </Text>
              <Text
                fontSize="18px"
                textAlign="justify"
                fontFamily="roboto"
                paddingBottom={1}
                mx={{ base: 25, sm: 3, md: 130 }}
              >
                As a Google Software Engineer Intern, you'll work on our core
                products and services, gaining real-world experience and working on
                projects that impact millions of users. You'll have the opportunity
                to collaborate with experienced engineers and designers, contribute
                to open-source projects, and develop new features that will be used
                by people all around the world.
              </Text>
            </Flex>

            <VStack
              as="form"
              maxW="5xl"
              spacing={8}
              bg="transparent"
              rounded="50px"
              width="100%"
              p={{ base: 5, sm: 10 }}
              alignSelf="center"
              borderWidth={2}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <Text
                style={{
                  fontSize: '2rem',
                  marginBottom: '-0.75em',
                  marginTop: '-0.5em',
                }}
              >
                🚀
              </Text>
              <VStack spacing={8} w="100%">
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    textShadow: '0px 0px 10px #00000010',
                    paddingBottom: '0.2em',
                  }}
                >
                  Submit Application
                </Text>
                <Stack
                  w="100%"
                  spacing={3}
                  direction={{ base: 'column', md: 'row' }}
                >
                  {/* frontend!!! name, email, phone is read only,
                 we will pull it from the user's logged in account 
                 and show it as the placeholder */}
                  <FormControl id="name">
                    <FormLabel>Name</FormLabel>
                    <Input
                      readOnly
                      type="text"
                      placeholder="loggedInName"
                      rounded="100px"
                    />
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input
                      readOnly
                      type="email"
                      placeholder="loggedInEmail@test.com"
                      rounded="100px"
                    />
                  </FormControl>
                  <FormControl id="resume">
                    <FormLabel>Phone</FormLabel>
                    <Input
                      readOnly
                      type="text"
                      rounded="100px"
                      placeholder="loggedInPhone"
                    />
                  </FormControl>
                </Stack>

                {/* CV Upload */}
                <AspectRatio height={'200px'} width="100%">
                  <Box
                    borderStyle="dashed"
                    borderWidth="3px"
                    rounded="20px"
                    shadow="sm"
                    role="group"
                  >
                    <Box position="relative" height="100%" width="100%">
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        height="100%"
                        width="100%"
                        display="flex"
                        flexDirection="column"
                      >
                        <Stack
                          height="100%"
                          width="100%"
                          display="flex"
                          alignItems="center"
                          justify="center"
                          spacing="4"
                        >
                          <Stack p="8" textAlign="center" spacing="1">
                            <Heading fontSize="lg" fontWeight="bold">
                              Drop CV here [.pdf]
                            </Heading>
                            <Text fontWeight="light">or click to upload</Text>
                          </Stack>
                        </Stack>
                      </Box>
                      <Input
                        type="file"
                        height="100%"
                        width="100%"
                        position="absolute"
                        top="0"
                        left="0"
                        opacity="0"
                        aria-hidden="true"
                        accept=".pdf"
                      />
                    </Box>
                  </Box>
                </AspectRatio>

                <FormControl id="cover">
                  <FormLabel>Cover Letter (optional)</FormLabel>
                  <Textarea size="lg" placeholder="Paste here" rounded="15px" />
                </FormControl>
              </VStack>
              <VStack w="100%">
                <Button
                  size={'lg'}
                  bg="green.300"
                  color="white"
                  _hover={{
                    bg: 'green.500',
                  }}
                  borderRadius="200px"
                  w={{ base: '100%', md: '150px' }}
                  textShadow="0px 0px 20px #00000076"
                  shadow={'0px 4px 30px #0000001F'}
                >
                  Apply
                </Button>
              </VStack>
            </VStack>
          </Stack>
        </Container>
      </div>
    </>
  )
}

export default JobListing
