/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
import { Box, Button, Heading, Stack } from '@chakra-ui/react'
import { useTranslation, withTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  deleteCover,
  deleteUserCv,
  editPersonalInformation,
  removeCoverpic,
  removeProfilepic,
  uploadUserDocuments,
} from '../api/api'

const EditProfile = () => {
  const { t } = useTranslation('common')
  const currentUser = useSelector((state) => state as any)
  const [Pic, setPic] = useState({
    profilePic: '',
    coverPic: '',
  })
  const [File, setFile] = useState({
    cv: '',
    coverLetter: '',
  })

  useEffect(() => {
    setPic({
      coverPic: currentUser.auth.coverPic,
      profilePic: currentUser.auth.profilePic,
    })
  }, [currentUser])

  useEffect(() => {
    setFile({
      cv: currentUser.cv,
      coverLetter: currentUser.coverLetter,
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
      'https://marketplace.canva.com/EAFKZzWYqqE/1/0/1600w/canva-purple-navy-neon-gradient-modern-minimalist-man-tiktok-profile-picture-kqzwo_88iLY.jpg',
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

  const uploadCVHandler = (e: any) => {
    const token = localStorage.getItem('jwt')
    const fd = new FormData()
    if (e.target.files[0]) {
      fd.append('cv', e.target.files[0], e.target.files[0].name)
      uploadUserDocuments(token, fd)
        .then((response) => {
          window.location.reload()
          setFile({ ...File, cv: response.data })
          window.location.reload()
          toast('Successfully Updated CV ' + e.target.files[0].name)
        })
        .catch((error) => {
          toast(error.message)
        })
    }
  }
  const deleteCVHandler = (e: any) => {
    const token = localStorage.getItem('jwt')

    deleteUserCv(token)
      .then((response) => {
        setFile({ ...File, cv: response.data })
        window.location.reload()
        toast('Successfully deleted CV')
      })
      .catch((error) => {
        toast(error.message)
      })
  }
  const uploadCoverLetterHandler = (e: any) => {
    const token = localStorage.getItem('jwt')
    const fd = new FormData()
    if (e.target.files[0]) {
      fd.append('coverLetter', e.target.files[0], e.target.files[0].name)
      uploadUserDocuments(token, fd)
        .then((response) => {
          setFile({ ...File, coverLetter: response.data })
          window.location.reload()
          toast('Successfully Updated coverLetter')
        })
        .catch((error) => {
          toast(error.message)
        })
    }
  }
  const deleteCoverHandler = (e: any) => {
    const token = localStorage.getItem('jwt')

    deleteCover(token)
      .then((response) => {
        setFile({ ...File, coverLetter: response.data })
        window.location.reload()
        toast('Successfully deleted Cover Letter')
      })
      .catch((error) => {
        toast(error.message)
      })
  }
  const removeUserCoverpic = () => {
    const token = localStorage.getItem('jwt')
    removeCoverpic(token)
      .then((response) => {
        console.log(response)
        setPic({ ...Pic, coverPic: response.data.coverPic })
        toast(('removeCoverPicture'))
      })
      .catch((error) => {
        toast(error.message)
      })
  }

  const removeUserProfilepic = () => {
    const token = localStorage.getItem('jwt')
    removeProfilepic(token)
      .then((response) => {
        console.log(response)
        setPic({ ...Pic, profilePic: response.data.profilePic })
        toast(('removeProfilePicture'))
      })
      .catch((error) => {
        toast(error.message)
      })
  }
  const clickCover = () => {
    document.getElementById('file-input-coverPic')?.click()
  }
  const clickProfile = () => {
    document.getElementById('file-input-profilePic')?.click()
  }
  const uploadCV = () => {
    document.getElementById('upload-cv')?.click()
  }
  const uploadCover = () => {
    document.getElementById('upload-cover')?.click()
  }

  return (
    <>
      <Layout>
        <NavBar />
        <Box display="flex" justifyContent="center" alignItems="center" pb={4}>
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
            {Pic.profilePic ? (
              <button style={{ position: 'absolute', top: '0', right: '0' }}>
                <img
                  src="https://img.icons8.com/material-sharp/512/trash.png"
                  alt="Delete Icon"
                  style={{
                    height: '35px',
                    width: '35px',
                    borderRadius: '100%',
                    backgroundColor: 'white',
                    padding: '1px',
                    margin: '2px',
                    border: '3px solid black',
                  }}
                  // add an onClick handler to delete the profile pic

                  onClick={removeUserProfilepic} 
                />
              </button>
            ) : null}
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
            {Pic.coverPic ? (
              <button
                style={{ position: 'absolute', bottom: '-10px', left: '-10px' }}
              >
                <img
                  src="https://img.icons8.com/material-sharp/512/trash.png"
                  alt="Delete Icon"
                  style={{
                    height: '35px',
                    width: '35px',
                    borderRadius: '100%',
                    backgroundColor: 'white',
                    padding: '1px',
                    margin: '2px',
                    border: '3px solid black',
                  }}
                  // add an onClick handler to delete the profile pic
                  onClick={removeUserCoverpic}
                />
              </button>
            ) : null}
          </div>
        </Stack>
        <div
          style={{
            marginLeft: '25%',
          }}
        >
          <div
            style={{
              display: 'inline',
              marginRight: '5rem',
            }}
          >
            <a onClick={uploadCV}>
              <Button>Upload CV</Button>
            </a>
            <input
              type="file"
              id="upload-cv"
              onChange={uploadCVHandler}
              style={{ display: 'none' }}
            />

           
          </div>
          <div
            style={{
              display: 'inline',
              marginRight: '5rem',
            }}
          >
            <a onClick={uploadCover}>
              <Button>Upload Cover</Button>
            </a>
            <input
              type="file"
              id="upload-cover"
              onChange={uploadCoverLetterHandler}
              style={{ display: 'none' }}
            />
          </div>
          <div
            style={{
              display: 'inline',
            }}
          >
            <Button onClick={deleteCVHandler} mr={'5rem'}>
              Delete CV
            </Button>
            <Button onClick={deleteCoverHandler}>Delete Cover</Button>
          </div>
        </div>
        {/* <embed src={`data:application/pdf;base64,${currentUser.auth.coverLetter}`} /> */}
        <div style={{ marginLeft: '25%', marginTop: '2rem' }}>
          {currentUser.auth.cv ? (
            <a
              download="Your CV"
              href={`data:application/pdf;base64,${currentUser.auth.cv}`}
              style={{ marginRight: '6rem' }}
            >
              Download CV
            </a>
          ) : (
            <a style={{ marginRight: '4.5rem' }}>No CV uploaded</a>
          )}

          {currentUser.auth.coverLetter ? (
            <a
              download="Cover Letter"
              href={`data:application/pdf;base64,${currentUser.auth.coverLetter}`}
            >
              Download cover
            </a>
          ) : (
            <a style={{ marginRight: '4.5rem' }}>No Cover uploaded</a>
          )}
        </div>

        {/* my profile */}
        <InformationBox />

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

export default withTranslation('common')(EditProfile)
