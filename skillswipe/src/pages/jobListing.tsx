/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
import {
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
import { Fragment } from 'react'
// Here we have used react-icons package for the icons
import NavBar from '@/components/NavBar'
import { wrap } from 'module'
import Head from 'next/head'
import { BsPhone } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import { HiOutlineMail } from 'react-icons/hi'
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
      <Container maxW="7xl" px={{ base: 5, md: 8 }}>
        <Stack spacing={10} paddingBottom={'100px'}>
          <Flex align="center" justify="center" direction="column">
            <Heading fontSize="4xl" mb={6} fontWeight={700}>
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
            <Container maxW="5xl" paddingBottom={5}>
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3 }}
                spacing={5}
                mt={5}
                mb={4}
              >
                {ListingData.map((data) => (
                  <Box
                    key={data.id}
                    p={5}
                    boxShadow="md"
                    rounded="md"
                    borderWidth={1}
                  >
                    <Text fontWeight="bold" fontSize="x-large" textAlign={'center'}>
                      {data.text}
                    </Text>
                    <Text textAlign={'center'}>{data.label}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Container>
            <Text
              style={{
                fontWeight: 800,
                fontSize: '2rem',
                textShadow: '0px 0px 10px #00000010',
                paddingBottom: '0.5em',
              }}
            >
              Description
            </Text>
            <Text fontSize="18px" textAlign="justify" mx={{ base: 5, md: 8 }}>
              The Google Cloud Platform team helps customers transform and build
              what's next for their business — all with technology built in the
              cloud. Our products are engineered for security, reliability and
              scalability, running the full stack from infrastructure to applications
              to devices and hardware. Our teams are dedicated to helping our
              customers — developers, small and large businesses, educational
              institutions and government agencies — see the benefits of our
              technology come to life. As part of an entrepreneurial team in this
              rapidly growing business, you will play a key role in understanding the
              needs of our customers and help shape the future of businesses of all
              sizes use technology to connect with customers, employees and partners.
              As a Technical Account Management Lead, you will help customers
              successfully adopt Google Cloud products and manage the delivery of
              Customer Experience engagements to drive customer adoption of Google
              Cloud services. You'll deliver product and implementation expertise to
              our customers to help them get the most out of their Google Cloud
              investments. You will regularly engage with stakeholder groups,
              including executives of large enterprises, and a cross-functional and
              geographically dispersed team.In this role, you will travel
              domestically and internationally approximately 25% of the time. Google
              Cloud accelerates organizations’ ability to digitally transform their
              business with the best infrastructure, platform, industry solutions and
              expertise. We deliver enterprise-grade solutions that leverage Googles
              cutting-edge technology – all on the cleanest cloud in the industry.
              Customers in more than 200 countries and territories turn to Google
              Cloud as their trusted partner to enable growth and solve their most
              critical business problems. The US base salary range for this full-time
              position is $150,000-$238,000 + bonus + equity + benefits. Our salary
              ranges are determined by role, level, and location. The range displayed
              on each job posting reflects the minimum and maximum target for new
              hire salaries for the position across all US locations. Within the
              range, individual pay is determined by work location and additional
              factors, including job-related skills, experience, and relevant
              education or training. Your recruiter can share more about the specific
              salary range for your preferred location during the hiring process.
              Please note that the compensation details listed in US role postings
              reflect the base salary only, and do not include bonus, equity, or
              benefits. Learn more about benefits at Google.
            </Text>
          </Flex>

          <VStack
            as="form"
            spacing={8}
            w="100%"
            bg={useColorModeValue('#FFFFFF26', '#00000026')}
            rounded="30px"
            boxShadow="0px 6px 30px #00000045"
            p={{ base: 5, sm: 10 }}
          >
            <VStack spacing={4} w="100%">
              <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input type="text" placeholder="Name" rounded="md" />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="test@test.com" rounded="md" />
                </FormControl>
              </Stack>
              <FormControl id="subject">
                <FormLabel>Subject</FormLabel>
                <Input
                  type="text"
                  placeholder="Are you available for freelance work?"
                  rounded="md"
                />
              </FormControl>
              <FormControl id="message">
                <FormLabel>Message</FormLabel>
                <Textarea size="lg" placeholder="Enter your message" rounded="md" />
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Button
                bg="green.300"
                color="white"
                _hover={{
                  bg: 'green.500',
                }}
                borderRadius="100px"
                w={{ base: '100%', md: 'max-content' }}
              >
                Apply
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Container>
    </>
  )
}

export default JobListing
