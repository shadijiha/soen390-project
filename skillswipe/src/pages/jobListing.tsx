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
import { Fragment } from 'react'
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
            <Text
              fontSize="18px"
              textAlign="justify"
              mx={{ base: 25, sm: 3, md: 150 }}
            >
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
            <VStack spacing={6} w="100%">
              <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
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
              <AspectRatio height={'100px'} width="100%">
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
                borderRadius="100px"
                w={{ base: '100%', md: 'max-content' }}
                textShadow="0px 0px 20px #0000003E"
                shadow={'0px 4px 30px #0000001F'}
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
