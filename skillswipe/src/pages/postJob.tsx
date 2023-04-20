import NavBar from '@/components/NavBar'
import {
  Box,
  Button,
  Checkbox,
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
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
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
    coverLetter: false,
    transcript: false,
    id: 0,
    externalUrl: '',
  })

  const { t } = useTranslation('common')

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
      (!isFormHidden &&
        (postListing.coverLetter == null || postListing.transcript == null))
    ) {
      toast(t('fillAllFields'))
      return
    } else {
      // forcing salary to be int
      const salary = parseInt(postListing.salary.toString(), 10)
      postListing.salary = salary

      createJob(token, postListing).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('createListing '))
        } else {
          toast.error(t('errorCreateListing'))
        }
      })
    }
  }

  const [isFormHidden, setFormHidden] = useState(true)

  return (
    <>
      <NavBar />
      <div data-testid="post-job">
        <Container maxW="5xl" paddingBottom={8}>
          <Box
            border={'1px'}
            borderColor={'#E5EAF061'}
            borderRadius={'40px'}
            padding={'4em'}
            w="100%"
            boxShadow={'0px 0px 10px #00000010'}
            marginBottom={'3em'}
          >
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
                {t('createJobListing')}
              </Text>
              <Checkbox
                defaultChecked={!isFormHidden}
                onChange={(e) => setFormHidden(!e.target.checked)}
              >
                {t('hideFormInputs')}
              </Checkbox>{' '}
            </VStack>

            <VStack spacing={'2.5em'} w="100%">
              {!isFormHidden && (
                <FormControl id="externalUrl">
                  <FormLabel htmlFor="externalUrl">{t('externalURL')}</FormLabel>
                  <Input
                    onChange={(event) =>
                      setJobListing({
                        ...postListing,
                        externalUrl: event.target.value,
                      })
                    }
                    name="externalUrl"
                    id="externalUrl"
                    type="text"
                    placeholder="ex: https://www.google.com/careers/1"
                    rounded="100px"
                  />
                </FormControl>
              )}
              <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
                <FormControl id="jobTitle">
                  <FormLabel htmlFor="jobTitle"> {t('positionTitle')}</FormLabel>
                  <Input
                    onChange={(event) =>
                      setJobListing({
                        ...postListing,
                        jobTitle: event.target.value,
                      })
                    }
                    name="jobTitle"
                    id="jobTitle"
                    type="text"
                    placeholder="ex: FullStack Software Engineer"
                    rounded="100px"
                  />
                </FormControl>

                <FormControl id="companyName">
                  <FormLabel htmlFor="companyName">{t('company')}</FormLabel>
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
                  <FormLabel htmlFor="location">{t('location')}</FormLabel>
                  <Input
                    onChange={(event) =>
                      setJobListing({
                        ...postListing,
                        location: event.target.value,
                      })
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
                  <FormLabel htmlFor="salary">{t('salary')} (/hr)</FormLabel>
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
                    {t('jobType')}
                  </FormLabel>
                  <RadioGroup
                    onChange={(value) =>
                      setJobListing({ ...postListing, jobType: value })
                    }
                  >
                    <HStack spacing="auto">
                      <Radio value="full-time">{t('fullTime')}</Radio>
                      <Radio value="part-time">{t('partTime')}</Radio>
                      <Radio value="contract">{t('contract')}</Radio>
                      <Radio value="other">{t('other')}</Radio>
                    </HStack>
                  </RadioGroup>
                </FormControl>
              </Stack>

              <Stack w="100%" spacing={3} direction={{ base: 'column', md: 'row' }}>
                {isFormHidden && (
                  <FormControl as="fieldset">
                    <FormLabel as="legend" paddingBottom={1.5}>
                      {t('coverLetter')}
                    </FormLabel>
                    <RadioGroup
                      onChange={(value) =>
                        setJobListing({
                          ...postListing,
                          coverLetter: value === 'true' ? true : false,
                        })
                      }
                    >
                      <HStack spacing="10%">
                        <Radio value="true">{t('yes')}</Radio>
                        <Radio value="false">{t('no')}</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                )}
                {isFormHidden && (
                  <FormControl as="fieldset">
                    <FormLabel as="legend" paddingBottom={1.5}>
                      {t('transcript')}
                    </FormLabel>
                    <RadioGroup
                      onChange={(value) =>
                        setJobListing({
                          ...postListing,
                          transcript: value === 'true' ? true : false,
                        })
                      }
                    >
                      <HStack spacing="10%">
                        <Radio value="true">{t('yes')}</Radio>
                        <Radio value="false">{t('no')}</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                )}

                {!isFormHidden && (
                  <FormControl as="fieldset">
                    <FormLabel as="legend" paddingBottom={1.5}>
                      {t('coverLetter')}
                    </FormLabel>
                    <RadioGroup
                      value={postListing.coverLetter.toString()}
                      onChange={(value) =>
                        setJobListing({
                          ...postListing,
                          coverLetter: value === 'true' ? true : false,
                        })
                      }
                    >
                      <HStack spacing="10%">
                        <Radio value="true" isDisabled>
                          {t('yes')}
                        </Radio>
                        <Radio value="false">{t('no')}</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                )}
                {!isFormHidden && (
                  <FormControl as="fieldset">
                    <FormLabel as="legend" paddingBottom={1.5}>
                      {t('transcript')}
                    </FormLabel>
                    <RadioGroup
                      value={postListing.transcript.toString()}
                      onChange={(value) =>
                        setJobListing({
                          ...postListing,
                          transcript: value === 'true' ? true : false,
                        })
                      }
                    >
                      <HStack spacing="10%">
                        <Radio value="true" isDisabled>
                          {t('yes')}
                        </Radio>
                        <Radio value="false">{t('no')}</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                )}

                <FormControl id="startDate">
                  <FormLabel htmlFor="startDate">{t('startDate')}</FormLabel>
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
                  <FormLabel htmlFor="skills">{t('skillsNeeded')}</FormLabel>
                  <Input
                    onChange={(event) =>
                      setJobListing({ ...postListing, skills: event.target.value })
                    }
                    name="skills"
                    id="skills"
                    type="text"
                    rounded="100px"
                    placeholder={t('skillsPlaceholder')}
                  />
                </FormControl>
              </Stack>

              <FormControl
                id="jobDescription"
                style={{
                  paddingBottom: '1.5em',
                }}
              >
                <FormLabel htmlFor="jobDescription">{t('jobDescription')}</FormLabel>
                <Textarea
                  name="jobDescription"
                  id="jobDescription"
                  size="lg"
                  placeholder={t('pasteHere')}
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
                {t('create')}
              </Button>
            </VStack>
          </Box>
        </Container>
      </div>
    </>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default postJob
