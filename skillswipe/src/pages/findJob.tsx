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
  Link,
  Stack,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { Fragment } from 'react'
// Here we have used react-icons package for the icons
import { IconType } from 'react-icons'
import { FaRegEye } from 'react-icons/fa'

interface JobAttributes {
  title: string
  link: string
  created_at: string
  meta: {
    applications: number
  }
}

const jobs: JobAttributes[] = [
  {
    title: 'Software Engineer at Google',
    link: 'https://google.com',
    created_at: '21 Jan 2022',
    meta: {
      applications: 500,
    },
  },
  {
    title: 'Software Engineer at Facebook',
    link: 'https://facebook.com',
    created_at: '20 Jun 2021',
    meta: {
      applications: 300,
    },
  },
  {
    title: ' Software Engineer at Microsoft',
    link: 'https://microsoft.com',
    created_at: '31 Sept 2022',
    meta: {
      applications: 150,
    },
  },
]

const findJob = () => {
  return (
    <>
      <NavBar />
      <Container maxW="5xl" p={{ base: 10, md: 0 }}>
        <Flex justify="left" mb={3}>
          <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
            Open Jobs
          </chakra.h3>
        </Flex>
        <VStack
          border="1px solid"
          borderColor="gray.400"
          rounded="md"
          overflow="hidden"
          spacing={0}
        >
          {jobs.map((job, index) => (
            <Fragment key={index}>
              <Grid
                templateRows={{ base: 'auto auto', md: 'auto' }}
                w="100%"
                templateColumns={{ base: 'unset', md: '4fr 2fr 2fr' }}
                p={{ base: 2, sm: 4 }}
                gap={3}
                alignItems="center"
                _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
              >
                <Box gridColumnEnd={{ base: 'span 2', md: 'unset' }}>
                  <chakra.h3
                    as={Link}
                    href={job.link}
                    isExternal
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    {job.title}
                  </chakra.h3>
                  <chakra.p
                    fontWeight="medium"
                    fontSize="sm"
                    color={useColorModeValue('gray.600', 'gray.300')}
                  >
                    Published: {job.created_at}
                  </chakra.p>
                </Box>
                <HStack
                  spacing={{ base: 0, sm: 3 }}
                  alignItems="center"
                  fontWeight="medium"
                  fontSize={{ base: 'xs', sm: 'sm' }}
                  color={useColorModeValue('gray.600', 'gray.300')}
                >
                  <JobStat icon={FaRegEye} value={job.meta.applications} />
                </HStack>
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
              {jobs.length - 1 !== index && <Divider m={0} />}
            </Fragment>
          ))}
        </VStack>
      </Container>
    </>
  )
}

const JobStat = ({ icon, value }: { icon: IconType; value: number }) => {
  return (
    <Flex p={1} alignItems="center">
      <Icon as={icon} w={5} h={5} mr={2} />
      <chakra.span> {value} </chakra.span>
    </Flex>
  )
}

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
