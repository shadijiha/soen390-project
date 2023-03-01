/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */

import { Container, Divider, Flex, Stack } from '@chakra-ui/react'
// Here we have used react-icons package for the icons
import JobDescription from '@/components/jobListing/JobDescription'
import JobInfoBoxes from '@/components/jobListing/JobInfoBoxes'
import SkillsListing from '@/components/jobListing/SkillsListing'
import SubmitAppForm from '@/components/jobListing/SubmitAppForm'
import TopHeader from '@/components/jobListing/TopHeader'
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'

const JobListing = () => {
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

export default JobListing
