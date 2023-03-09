/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import {
  Container,
  Divider,
  Flex,
  Spinner,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ProfileStyle from '../../styles/profilestyle'
import {
  acceptRequest,
  getPendingRequest,
  getUserById,
  removeConnection,
  sendRequest,
} from '../api/api'

import JobDescription from '@/components/jobListing/JobDescription'
import JobInfoBoxes from '@/components/jobListing/JobInfoBoxes'
import SkillsListing from '@/components/jobListing/SkillsListing'
import SubmitAppForm from '@/components/jobListing/SubmitAppForm'
import TopHeader from '@/components/jobListing/TopHeader'
import Awards from '@/components/Profile/Awards'
import Courses from '@/components/Profile/Courses'
import Languages from '@/components/Profile/Languages'
import PersonalProjectsProfile from '@/components/Profile/PersonalProjectsProfile'
import Recommendations from '@/components/Profile/Recommendations'
import Skills from '@/components/Profile/Skills'
import Volunteering from '@/components/Profile/Volunteering'
import WorkExperience from '@/components/Profile/WorkExperience'
import Education from '../../components/Profile/education'

const jobListing = () => {
  const router = useRouter()
  const { toggleColorMode } = useColorMode()
  const buttonColors = useColorModeValue('black', 'white')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    gender: '',
    profilePic: '',
    coverPic: '',
    biography: '',
    skills: [],
    awards: [],
    workExperiences: [],
    educations: [],
    volunteeringExperience: [],
    recommendationsReceived: [],
    projects: [],
    courses: [],
    Languages: [],
  })
  const [Status, setStatus] = useState({
    connected: false,
    Requested: false,
    Pending: false,
  })
  const currentUser = useSelector((state) => state as any)

  const [profile, setProfile] = useState({
    image:
      'https://marketplace.canva.com/EAFKZzWYqqE/1/0/1600w/canva-purple-navy-neon-gradient-modern-minimalist-man-tiktok-profile-picture-kqzwo_88iLY.jpg',
    cover:
      'https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc',
  })

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
export default jobListing
