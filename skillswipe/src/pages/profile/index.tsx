import NavBar from '@/components/NavBar'
import Awards from '@/components/Profile/Awards'
import Courses from '@/components/Profile/Courses'
import PersonalProjectsProfile from '@/components/Profile/PersonalProjectsProfile'
import Skills from '@/components/Profile/Skills'
import Volunteering from '@/components/Profile/Volunteering'
import WorkExperience from '@/components/Profile/WorkExperience'
import { Divider, Stack, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import Languages from '../../components/Profile/Languages'
import Education from '../../components/Profile/education'
import ProtectedRoute from '../../components/ProtectedRoute'
import AuthContext from '../../contexts/AuthContext'
import ProfileStyle from '../../styles/profilestyle'

const Profile = () => {
  const { user } = useContext(AuthContext)
  const { t } = useTranslation('common')
  const { toggleColorMode } = useColorMode()
  const buttonColors = useColorModeValue('black', 'white')
  const router = useRouter()

  const [profile, setProfile] = useState({
    name: '',
    title: '',
    location: '',
    school: '',
    experience: 'Five years of experience in full stack development',
    experience2: 'Three years of experience in mobile development',
    experience3: 'Two years of experience in data analysis',
    image:
      'https://marketplace.canva.com/EAFKZzWYqqE/1/0/1600w/canva-purple-navy-neon-gradient-modern-minimalist-man-tiktok-profile-picture-kqzwo_88iLY.jpg',
    cover:
      'https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc',
  })

  return (
    <ProtectedRoute>
      <style jsx>{ProfileStyle}</style>
      <NavBar />

      <div data-testid="profile-page">
        <div
          id="profile"
          className="profile-container"
          style={{
            marginTop: '-3em',
          }}
        >
          <Head>
            <title>SkillSwipe</title>
            <meta property="og:title" content="SkillSwipe" />
          </Head>

          {/* profile picture */}
          <div className="profile-top-card">
            <img
              alt="image"
              src={
                user?.profilePic
                  ? `data:image/jpeg;base64,${user.profilePic}`
                  : profile.image
              }
              className="profile-image"
              style={{
                aspectRatio: '1/1',
                objectFit: 'cover',
              }}
            />

            <div
              className="profile-container01"
              style={{
                //make the background image repeat itself
                backgroundRepeat: 'repeat',
                // make the background image to be 35% opacity
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                // make the background image to be 50% opacity
                backgroundBlendMode: 'multiply',
                // make the container take the entire screens width

                backgroundImage: `url(${
                  user.coverPic
                    ? `data:image/jpeg;base64,${user.coverPic}`
                    : profile.image
                })`,
              }}
            >
              <h1
                className="profile-text01"
                style={{
                  fontSize: '1.5em',
                  fontWeight: 700,
                  textShadow: '0px 0px 30px #00000085',

                  color: 'white',
                }}
              >
                {user.firstName + ' ' + user.lastName} 👋🏼
              </h1>
              <span
                className="profile-text02"
                style={{
                  fontSize: '1em',
                  textShadow: '0px 0px 30px #00000085',

                  color: 'white',
                }}
              >
                📨 {user.email}
              </span>
              <span
                className="profile-text03"
                style={{
                  fontSize: '1em',
                  textShadow: '0px 0px 30px #00000085',

                  color: 'white',
                }}
              >
                <span>📱 {user.mobileNo}</span>
                <br></br>
                <br></br>
              </span>
              <div className="profile-container03">
                <span
                  className="profile-text06"
                  style={{
                    textShadow: '0px 0px 30px #000000B4',
                    marginLeft: '0px',
                    color: 'white',
                  }}
                >
                  💬 {user.biography}
                </span>
              </div>

              <div className="profile-container05">
                {/* to do: show this edit button only if user in == the profile that is shown */}
                <button
                  className="profile-button1 button"
                  style={{
                    color: 'white',
                    borderColor: 'white',

                    borderWidth: '2px',
                    textShadow: '0px 0px 40px #000000CA',
                    fontWeight: 600,
                  }}
                  onClick={() => {
                    router.push('/profile/editProfile')
                  }}
                >
                  {t('edit')}
                </button>
              </div>
            </div>
          </div>

          <Stack
            direction={'row'}
            paddingTop="1rem"
            style={{
              flexWrap: 'wrap',
            }}
          >
            {/* SKILLS SECTION */}

            {user.skills && user.skills.length > 0 ? (
              <Skills skillsArray={user.skills} />
            ) : (
              <></>
            )}

            {/* AWARDS SECTION */}
            {user.awards && user.awards.length > 0 ? (
              <Awards awards={user.awards} />
            ) : (
              <></>
            )}
          </Stack>

          <br></br>
          <Divider />

          <br></br>
          <Divider />

          {/* CAREER JOURNEY WORK EXPERIENCE */}
          {user.workExperiences && user.workExperiences.length > 0 ? (
            <WorkExperience experience={user.workExperiences} />
          ) : (
            <></>
          )}

          <Divider />
          {/* EDUCATION SECTION */}

          {user.educations && user.educations.length > 0 ? (
            <Education education={user.educations} />
          ) : (
            <></>
          )}
          <Divider />
          {/* VOLUNTEERING SECTION */}

          {user.volunteeringExperience && user.volunteeringExperience.length > 0 ? (
            <Volunteering volunteer={user.volunteeringExperience} />
          ) : (
            <></>
          )}
          <Divider />
          {/* LANGUAGES SECTION */}

          {user.languages && user.languages.length > 0 ? (
            <Languages languages={user.languages} />
          ) : (
            <></>
          )}

          <Divider />
          {/* PERSONAL PROJECTS */}
          {user.projects && user.projects.length > 0 ? (
            <PersonalProjectsProfile Project={user.projects} />
          ) : (
            <></>
          )}
          <Divider />

          {/* COURSES ACCOMPLISHED */}

          {user.courses && user.courses.length > 0 ? (
            <Courses courses={user.courses} />
          ) : (
            <></>
          )}

          {/* temporary div below for spacing under page, will need to remove in final sprint */}
          <div
            style={{
              display: 'flex',
              paddingBottom: '10em',
            }}
          ></div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Profile
