/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import JobDescription from '@/components/jobListing/JobDescription'
import JobInfoBoxes from '@/components/jobListing/JobInfoBoxes'
import SkillsListing from '@/components/jobListing/SkillsListing'
import SubmitAppForm from '@/components/jobListing/SubmitAppForm'
import TopHeader from '@/components/jobListing/TopHeader'
import { Button, Checkbox, Container, Divider, Flex, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { viewJob } from '../api/api'

type JobAttributes = {
  id?: number
  jobTitle?: string
  companyName?: string
  location?: string
  jobDescription?: string
  salary?: string
  jobType?: string
  startDate?: string
  coverLetter?: boolean
  transcript?: boolean
  skills?: Array<string>
  externalUrl?: string
}

const jobListing = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [job, setJob] = useState<JobAttributes>({})
  const [jobSkills, setSkills] = useState<Array<string>>([])

  useEffect(() => {
    if (router.query.id) {
      const jobId = parseInt(router.query.id as string)
      const token = localStorage.getItem('jwt')

      viewJob(token, jobId)
        .then((response) => {
          setJob(response.data)
        })
        .catch((error) => {
          console.error(error)
          toast.error(t('errorJobs'))
        })
    }
  }, [router.query.id])

  if (!job) {
    return <div> {t('loading')} </div>
  }

  useEffect(() => {
    if (job.skills) {
      setSkills(job.skills)
    }
  }, [job.skills])
  const [isFormHidden, setFormHidden] = useState(false)

  // make isFormHidden true if the job is external by seeing if externalUrl is not null
  useEffect(() => {
    if (job.externalUrl) {
      setFormHidden(true)
    }
  }, [job.externalUrl])

  return (
    <>
      <Layout>
        <NavBar />
        <div data-testid="job-listing">
          <Container maxW="7xl" px={{ base: 5, md: 8 }}>
            <Stack spacing={10}>
              <Flex align="center" justify="center" direction="column">
                {/* Company logo, Company Name, Job Name in TopHeader */}
                <TopHeader jobTitle={job.jobTitle} companyName={job.companyName} />

                {/* Skills Needed in the Job Listed */}
                <SkillsListing skills={jobSkills} />
                {/* Top 3 boxes */}
                <JobInfoBoxes
                  salary={job.salary}
                  jobType={job.jobType}
                  startDate={job.startDate}
                  location={job.location}
                />

                <Divider />
              </Flex>
              {/* Job Description */}
              <JobDescription jobDescription={job.jobDescription} />

              {/* Submit Application Form */}
              {!isFormHidden && <SubmitAppForm />}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {isFormHidden && (
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
                    // on click go to linkedin url
                    onClick={() => {
                      window.open(
                        // open the string externalUrl in a new tab
                        job.externalUrl,
                        '_blank'
                      )
                    }}
                  >
                    {t('View Job')}
                  </Button>
                )}
              </div>
            </Stack>
          </Container>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default jobListing
