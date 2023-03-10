/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { Container, Divider, Flex, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import JobDescription from '@/components/jobListing/JobDescription'
import JobInfoBoxes from '@/components/jobListing/JobInfoBoxes'
import SkillsListing from '@/components/jobListing/SkillsListing'
import SubmitAppForm from '@/components/jobListing/SubmitAppForm'
import TopHeader from '@/components/jobListing/TopHeader'
import axios from 'axios'
import router from 'next/router'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { viewJob, getOpenJobs, createJob } from '../api/api'


type JobAttributes = {
  id?: number
  jobTitle?: string
  companyName?: string
  location?: string
  jobDescription?: string
  salary: string
  jobType?: string
  startDate?: string
  coverLetter?: boolean
  transcript?: boolean
  skills?: Array < string >
}

const jobListing = () => {
  const router = useRouter()
  const [job, setJobPage] = useState<JobAttributes[]>([])


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
          toast.error('Error getting job')
        })
    }
  }, [router.query.id])

  if (!job) {
    return <div>Loading...</div>
  }

  
 
  return (
    <>

      <Layout>
        <NavBar />
        <div data-testid="job-listing">
          <Container maxW="7xl" px={{ base: 5, md: 8 }}>
            <Stack spacing={10}>
              <Flex align="center" justify="center" direction="column">
                {/* Company logo, Company Name, Job Name in TopHeader */}
                <TopHeader />

                {/* Skills Needed in the Job Listed */}
                <SkillsListing />
                {/* Top 3 boxes */}
                <JobInfoBoxes 
                  data = { 
                     [
                      {
                        id: 1,
                        label: 'Job Type',
                        text: {job.jobType},
                      },
                      {
                        id: 2,
                        label: 'Location',
                        text: {job.location},
                      },
                      {
                        id: 3,
                        label: 'Salary',
                        text: {job.salary},
                      },
                    ] 
                  } 
                />
                <Divider />
              </Flex>

              {/* Job Description */}
              <JobDescription
                jobDescription={job.jobDescription}
              />

              {/* Submit Application Form */}
              <SubmitAppForm 
                coverLetter={job.coverLetter}
              />
            </Stack>
          </Container>
        </div>
      </Layout>
    </>
  )

}
export default jobListing
