import AwardsBox from '@/components/EditProfile/AwardsBox'
import CoursesBox from '@/components/EditProfile/CoursesBox'
import EducationHistoryBox from '@/components/EditProfile/EductationHistoryBox'
import ExperienceBox from '@/components/EditProfile/ExperienceBox'
import InformationBox from '@/components/EditProfile/InformationBox'
import LanguagesBox from '@/components/EditProfile/LanguagesBox'
import PersonalProjectsBox from '@/components/EditProfile/PersonalProjectsBox'
import SkillsBox from '@/components/EditProfile/SkillsBox'
import VolunteeringBox from '@/components/EditProfile/VolunteeringBox'
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { Box, Heading, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { editPersonalInformation } from './api/api'

const EditProfile = () => {
  const { t } = useTranslation('common')
  const currentUser = useSelector((state) => state as any)
  const [Pic, setPic] = useState({
    profilePic: '',
    coverPic: '',
  })
  useEffect(() => {
    setPic({
      coverPic: currentUser.auth.coverPic,
      profilePic: currentUser.auth.profilePic,
    })
  }, [currentUser])

  const [profile, setProfile] = useState({
    name: 'John Smith',
    title: 'Software Engineer',
    location: 'Montreal, QC, CA',
    school: 'Concordia University',
    experience: 'Five years of experience in full stack development',
    experience2: 'Three years of experience in mobile development',
    experience3: 'Two years of experience in data analysis',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg',
    cover:
      'https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc',
  })

  const coverImageHandler = (e: any) => {
    const token = localStorage.getItem('jwt')
    const fd = new FormData()
    if (e.target.files[0]) {
      fd.append('coverPic', e.target.files[0], e.target.files[0].name)
      editPersonalInformation(token, fd)
        .then((response) => {
          console.log(response)
          setPic({ ...Pic, coverPic: response.data.coverPic })
          toast(t('updateCoverPicture'))
        })
        .catch((error) => {
          toast(error.message)
        })
    }
  }

  const ProfileImageHandler = (e: any) => {
    console.log(e.target)
    const token = localStorage.getItem('jwt')
    const fd = new FormData()
    if (e.target.files[0]) {
      fd.append('profilePic', e.target.files[0], e.target.files[0].name)
      editPersonalInformation(token, fd)
        .then((response) => {
          setPic({ ...Pic, profilePic: response.data.profilePic })
          toast(t('updateProfilePicture'))
        })
        .catch((error) => {
          toast(error.message)
        })
    }
  }
  const clickCover = () => {
    document.getElementById('file-input-coverPic')?.click()
  }
  const clickProfile = () => {
    document.getElementById('file-input-profilePic')?.click()
  }

  return (
    <>
      <Layout>
        <NavBar />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          pb={4}
          data-testid="edit-profile"
        >
          <Box>
            <Heading
              style={{
                fontSize: '2.5rem',
                fontWeight: '200',
              }}
            >
              {t('hey')}, {currentUser.auth.firstName}!
            </Heading>
          </Box>
        </Box>

        <Stack
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* profile picture */}
          <div
            className="profile-picture"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '150px',
              width: '150px',
              position: 'relative',
              margin: '2%',
              marginBottom: '5%',
            }}
          >
            <button style={{ position: 'absolute', bottom: '0', right: '0' }}>
              {/* upload new profile pic button */}
              <input
                type="file"
                id="file-input-profilePic"
                style={{ display: 'none' }}
                onClick={clickProfile}
                onChange={ProfileImageHandler}
              />
              <label htmlFor="file-input-profilePic">
                <img
                  src="https://img.icons8.com/material-sharp/512/send-letter.png"
                  alt="Upload Icon"
                  style={{
                    height: '35px',
                    width: '35px',
                    borderRadius: '100%',
                    backgroundColor: 'white',
                  }}
                />
              </label>
            </button>
            <a onClick={clickProfile}>
              <img
                alt="image"
                src={
                  Pic.profilePic
                    ? `data:image/jpeg;base64,${Pic.profilePic}`
                    : profile.image
                }
                className="profile-image"
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: '100%',
                  boxShadow: '0 5px 17px 0px rgba(0, 0, 0, 0.6)',
                }}
              />
            </a>

            <input
              type="file"
              id="file-input-profilePic"
              style={{ display: 'none' }}
              onChange={ProfileImageHandler}
            />
          </div>

          {/* cover photo */}

          <div
            className="profile-cover"
            style={{
              position: 'relative',
              height: '250px',
              width: 'max-content',
              margin: '2%',
            }}
          >
            <button
              style={{ position: 'absolute', bottom: '-10px', right: '-10px' }}
            >
              {/* upload new profile cover button */}
              <input
                type="file"
                id="file-input-coverPic"
                style={{ display: 'none' }}
                onClick={clickCover}
                onChange={coverImageHandler}
              />
              <label htmlFor="file-input-coverPic">
                <img
                  src="https://img.icons8.com/material-sharp/512/send-letter.png"
                  alt="Upload Icon"
                  style={{
                    height: '35px',
                    width: '35px',
                    borderRadius: '100%',
                    backgroundColor: 'white',
                  }}
                />
              </label>
            </button>
            <a onClick={clickCover}>
              <img
                alt="image"
                src={
                  Pic.coverPic
                    ? `data:image/jpeg;base64,${Pic.coverPic}`
                    : profile.cover
                }
                className="profile-cover"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '30px',
                  boxShadow: '0 5px 17px 0px rgba(0, 0, 0, 0.6)',
                }}
              />
            </a>
            <input
              type="file"
              id="file-input-coverPic"
              style={{ display: 'none' }}
              onChange={coverImageHandler}
            />
          </div>
        </Stack>

        {/* my profile */}
        <InformationBox test-id="infoBox" />

        {/* work experience */}
        <ExperienceBox />

        {/* Education History */}
        <EducationHistoryBox />

        {/* awards */}
        <AwardsBox />

        {/* skills */}
        <SkillsBox />

        {/* Volunteering */}
        <VolunteeringBox />

        {/* Personal Projects */}
        <PersonalProjectsBox />

        {/* languages */}
        <LanguagesBox />

        {/* Certifications */}
        <CoursesBox />
      </Layout>
    </>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default EditProfile
