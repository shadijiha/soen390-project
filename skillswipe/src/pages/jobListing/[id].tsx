/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { Container, Divider, Flex, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import JobDescription from '@/components/jobListing/JobDescription'
import JobInfoBoxes from '@/components/jobListing/JobInfoBoxes'
import SkillsListing from '@/components/jobListing/SkillsListing'
import SubmitAppForm from '@/components/jobListing/SubmitAppForm'
import TopHeader from '@/components/jobListing/TopHeader'
import axios from 'axios'
import router from 'next/router'
import { toast } from 'react-toastify'
import { viewJob } from '../api/api'

interface JobAttributes {
  id: number
  jobTitle: ''
  companyName: ''
  location: ''
  jobDescription: ''
  salary: ''
  jobType: ''
  startDate: ''
  coverLetter: false
  transcript: false
  skills: []
}

const jobListing = () => {
  const [job, setJobPage] = useState<JobAttributes[]>([])
  useEffect(() => {
    const viewListing = async () => {
      // Get token from local storage
      const token = localStorage.getItem('jwt')

      try {
        // Call API function to get open jobs
        const response = await viewJob(token, 5)

        // Update state with fetched data
        setJobPage(response.data)
      } catch (error) {
        console.error(error)
        toast.error('Error getting jobs')
      }
    }
    viewListing()
  }, [])

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
                <p>NAME:</p>

                {/* Skills Needed in the Job Listed */}
                <SkillsListing />

                {/* Top 3 boxes */}
                <JobInfoBoxes />

                <Divider />
              </Flex>

              {/* Job Description */}
              <JobDescription />

              {/* Submit Application Form */}
              <SubmitAppForm />
            </Stack>
          </Container>
        </div>
      </Layout>
    </>
  )
}
export default jobListing
