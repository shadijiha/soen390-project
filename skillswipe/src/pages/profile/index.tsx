import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import Awards from '@/components/Profile/Awards'
import Courses from '@/components/Profile/Courses'
import PersonalProjectsProfile from '@/components/Profile/PersonalProjectsProfile'
import Skills from '@/components/Profile/Skills'
import Volunteering from '@/components/Profile/Volunteering'
import WorkExperience from '@/components/Profile/WorkExperience'
import { Avatar, Divider, Stack, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Languages from '../../components/Profile/Languages'
import Education from '../../components/Profile/education'
import ProfileStyle from '../../styles/profilestyle'

const Profile = () => {
  const { t } = useTranslation('common')
  const { toggleColorMode } = useColorMode()
  const buttonColors = useColorModeValue('black', 'white')
  const User = useSelector((state) => state as any)
  const router = useRouter()
  const [connections, setConnection] = useState(5)

  const [profile, setProfile] = useState({
    name: '',
    title: '',
    location: '',
    school: '',
    experience: 'Five years of experience in full stack development',
    experience2: 'Three years of experience in mobile development',
    experience3: 'Two years of experience in data analysis',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg',
    cover:
      'https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc',
  })

  return (
    <>
      <style jsx>{ProfileStyle}</style>
      <Layout>
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
              <div
                className="profile-container01"
                style={{
                  //make the background image repeat itself
                  backgroundRepeat: 'repeat',
                  // make the background image to be 35% opacity
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  // make the background image to be 50% opacity
                  backgroundImage: `url(${User.auth.coverPic
                    ? `data:image/jpeg;base64,${User.auth.coverPic}`
                    : profile.cover
                    })`,

                }}
              >
                <div className="profile-container02">
                  <div className='profile-image03'>
                    <Avatar
                      src={
                        User.auth.profilePic
                          ? `data:image/jpeg;base64,${User.auth.profilePic}`
                          : profile.image
                      }
                      size="xl"
                      style=
                      {{
                        borderRadius: "60%",
                        border: '0.1em solid white',
                        position: "relative",
                        top: "-2em",
                        left: "2%",
                      }}
                    />
                  </div>
                  <div className="profile-container03"
                  style={{
                    position: "relative",
                    
                  }}>
                    <h1
                      className="profile-text02"
                      style={{
                        fontSize: '1.5em',
                        fontWeight: 700,
                        textShadow: '0px 0px 30px #00000085',
                        color: 'white',
                      }}
                    >
                      {User.auth.firstName + ' ' + User.auth.lastName} 👋🏼
                    </h1>
                    <span
                      className="profile-text04"
                      style={{
                        fontSize: '1.2em',
                        textShadow: '0px 0px 30px #00000085',
                        color: 'white',

                      }}
                    >
                      📧 {User.auth.email}
                    </span>
                    {connections >= 0 && ( // only render this span if connections is positive
                      <span
                        className="profile-text03"
                        style={{
                          fontSize: '1em',
                          textShadow: '0px 0px 30px #00000085',
                          margin: '0.2em', // added margin to span
                          color: 'white',
                        }}
                      >
                        <span>{`${connections} Connections`}</span>
                      </span>
                    )}
                    {User.auth.biography && User.auth.workExperiences.length > 0 && ( // only render this span if biography and workExperiences are not empty
                      <span
                        className="profile-text06"
                        style={{
                          textShadow: '0px 0px 30px #000000B4',
                          color: 'white',
                        }}
                      >
                        💬{' '}
                        {`${User.auth.biography} \u25CF  ${User.auth.workExperiences[User.auth.workExperiences.length - 1].title
                          } at ${User.auth.workExperiences[User.auth.workExperiences.length - 1].company
                          } `}
                      </span>
                    )}
                  </div>

                

                  <div className="profile-container05">
                    {/* to do: show this edit button only if user logged in == the profile that is shown */}
                    <button
                      className="profile-button1 button"
                      style={{
                        color: 'white',
                        borderColor: 'white',
                        width: "100%",
                        borderWidth: '2px',
                        textShadow: '0px 0px 40px #000000CA',
                        fontWeight: 600,
                        fontSize: '1.2em',
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
            </div>

              <Stack
                direction={'row'}
                paddingTop="1rem"
                style={{
                  flexWrap: 'wrap',
                }}
              >
                {/* SKILLS SECTION */}

                {User.auth.skills && User.auth.skills.length > 0 ? (
                  <Skills skillsArray={User.auth.skills} />
                ) : (
                  <></>
                )}

                {/* AWARDS SECTION */}
                {User.auth.awards && User.auth.awards.length > 0 ? (
                  <Awards awards={User.auth.awards} />
                ) : (
                  <></>
                )}
              </Stack>

              <br></br>
              <Divider />

              <br></br>
              <Divider />

              {/* CAREER JOURNEY WORK EXPERIENCE */}
              {User.auth.workExperiences && User.auth.workExperiences.length > 0 ? (
                <WorkExperience experience={User.auth.workExperiences} />
              ) : (
                <></>
              )}

              <Divider />
              {/* EDUCATION SECTION */}

              {User.auth.educations && User.auth.educations.length > 0 ? (
                <Education education={User.auth.educations} />
              ) : (
                <></>
              )}
              <Divider />
              {/* VOLUNTEERING SECTION */}

              {User.auth.volunteeringExperience &&
                User.auth.volunteeringExperience.length > 0 ? (
                <Volunteering volunteer={User.auth.volunteeringExperience} />
              ) : (
                <></>
              )}
              <Divider />
              {/* LANGUAGES SECTION */}

              {User.auth.languages && User.auth.languages.length > 0 ? (
                <Languages languages={User.auth.languages} />
              ) : (
                <></>
              )}

              <Divider />
              {/* PERSONAL PROJECTS */}
              {User.auth.projects && User.auth.projects.length > 0 ? (
                <PersonalProjectsProfile Project={User.auth.projects} />
              ) : (
                <></>
              )}
              <Divider />

              {/* COURSES ACCOMPLISHED */}

              {User.auth.courses && User.auth.courses.length > 0 ? (
                <Courses courses={User.auth.courses} />
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
      </Layout>
    </>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Profile
