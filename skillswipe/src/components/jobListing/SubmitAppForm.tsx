import { applyToJob } from '@/pages/api/api'
import { useEffect, useRef, useState } from 'react'

import {
  AspectRatio,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import router from 'next/router'
import { AiOutlineFilePdf } from 'react-icons/ai'
import { toast } from 'react-toastify'
const SubmitAppForm = () => {
  const [cvUploaded, setCvUploaded] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cover, setCover] = useState('')

  const handleSubmit = (event) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    const jobId = parseInt(router.query.id as string)

    const submitApp = {
      name: name,
      email: email,
      phone: phone,
      ...(cvUploaded && { cv: cvUploaded }),
      coverLetter: cover,
      id: 0,
    }

    const missingFields = []

    if (!submitApp.name) {
      missingFields.push('name')
    }
    if (!submitApp.email) {
      missingFields.push('email')
    }
    if (!submitApp.phone) {
      missingFields.push('phone')
    }
    if (!submitApp.cv) {
      missingFields.push('cv')
    }
    if (!submitApp.coverLetter) {
      missingFields.push('cover letter')
    }

    if (missingFields.length > 0) {
      const message = `Please fill in the following fields: ${missingFields.join(
        ', '
      )}`
      toast.error(message)
      return
    } else {
      applyToJob(token, jobId, submitApp)
        .then((res) => {
          if (res.status == 201 || res.status == 200) {
            toast.success('Successfully applied to job. Good luck!')
          } else {
            console.error('Error applying to job!', res.data)
            toast.error('Error 1 API error occurred. Please try again later.')
          }
        })
        .catch((error) => {
          console.error('Error applying to job!', error)
          toast.error('Error 2 occurred. Please try again later.')
        })
    }
  }

  return (
    <>
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
          <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="loggedInName"
                rounded="100px"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="loggedInEmail@test.com"
                rounded="100px"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="resume">
              <FormLabel>Phone</FormLabel>
              <Input
                type="text"
                rounded="100px"
                placeholder="loggedInPhone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                  position="relative"
                  height="100%"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                >
                  {cvUploaded ? (
                    <HStack
                      style={{
                        padding: '1em',
                      }}
                    >
                      <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                      >
                        <Icon as={AiOutlineFilePdf} boxSize={12}></Icon>
                      </Box>
                      <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                      >
                        <Text>CV Successfully Uploaded</Text>
                      </Box>
                    </HStack>
                  ) : (
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
                  )}
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
                  onChange={(event) => {
                    if (event.target.files && event.target.files.length > 0) {
                      setCvUploaded(true)
                      toast.success('CV Uploaded')
                    }
                  }}
                />
              </Box>
            </Box>
          </AspectRatio>

          <FormControl id="cover">
            <FormLabel>Cover Letter (optional)</FormLabel>
            <Textarea
              size="lg"
              placeholder="Paste here"
              rounded="15px"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
            />
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
            onClick={handleSubmit}
          >
            Apply
          </Button>
        </VStack>
      </VStack>
    </>
  )
}

export default SubmitAppForm
