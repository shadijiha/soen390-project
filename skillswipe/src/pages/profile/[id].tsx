/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import Awards from '@/components/Profile/Awards'
import Courses from '@/components/Profile/Courses'
import PersonalProjectsProfile from '@/components/Profile/PersonalProjectsProfile'
import Recommendations from '@/components/Profile/Recommendations'
import Skills from '@/components/Profile/Skills'
import Volunteering from '@/components/Profile/Volunteering'
import WorkExperience from '@/components/Profile/WorkExperience'
import {
  Avatar,
  Divider,
  Spinner,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Education from '../../components/Profile/education'
import ProfileStyle from '../../styles/profilestyle'
import {
  acceptRequest,
  getPendingRequest,
  getUserById,
  removeConnection,
  sendRequest,
} from '../api/api'

const profile = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { toggleColorMode } = useColorMode()
  const buttonColors = useColorModeValue('black', 'white')
  const [loading, setLoading] = useState(true)
  const [connection, setConnection] = useState(0)
  const [LatestWorkExperience, setLatestWorkExprience] = useState([])
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
    workExperiences: [
      {
        title: '',
        company: '',
      },
    ],
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

  const Request = () => {
    const token = localStorage.getItem('jwt')
    sendRequest(token, router.query.id)
      .then((reponse) => {
        setStatus({ ...Status, Requested: true })
      })
      .catch((error) => {
        toast(error.message)
      })
  }
  const Accept = () => {
    const token = localStorage.getItem('jwt')
    acceptRequest(token, router.query.id)
      .then((reponse) => {
        setStatus({ ...Status, connected: true })
      })
      .catch((error) => {
        toast(error.message)
      })
  }
  const Reject = () => {
    const token = localStorage.getItem('jwt')
    removeConnection(token, router.query.id)
      .then((reponse) => {
        setStatus({ connected: false, Requested: false, Pending: false })
        toast.success('Connection has been removed', { type: 'success' })
      })
      .catch((error) => {
        toast(error.message)
      })
  }

  // get number of connections accepted by id
  const getAcceptedConnections = () => {
    const token = localStorage.getItem('jwt')
    getUserById(token, router.query.id)
      .then((response: any) => {
        console.log(response.data)
        setConnection(response.data.connections.length)
      })
      .catch((error) => {
        toast(error.message)
      })
  }

  useEffect(() => {
    if (router.query.id) {
      console.log(router.query.id)
      if (router.query.id == currentUser.id) {
        console.log('same url')
        router.push('/home')
      } else {
        const token = localStorage.getItem('jwt')
        getUserById(token, router.query.id)
          .then((response: any) => {
            console.log(response.data)
            setUser(response.data.user)
            getAcceptedConnections()
            if (response.data.connectionStatus == 'NotConnected') {
              setStatus({ ...Status, connected: false })
              console.log('Status')
            } else {
              if (response.data.connectionStatus == 'Pending') {
                getPendingRequest(token).then((response) => {
                  console.log(response)
                  if (response.data.length > 0) {
                    let found = false
                    console.log(response.data)
                    response.data.map((element: any) => {
                      if (element.user.id == router.query.id) {
                        setStatus({ ...Status, Pending: true })
                        found = true
                      }
                    })
                    if (found == false) {
                      setStatus({ ...Status, Requested: true })
                    }
                  } else {
                    setStatus({ ...Status, Requested: true })
                  }
                })
              } else {
                setStatus({ ...Status, connected: true })
              }
            }
            console.log(Status)
            setLoading(false)
          })
          .catch((error) => {
            toast(t('userNotFound'))
            router.push('/')
          })
      }
    }
  }, [router.query])

  const [profile, setProfile] = useState({
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg',
    cover:
      'https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc',
  })

  return (
    <>
      <style jsx>{ProfileStyle}</style>
      <Layout>
        {loading ? (
          <Spinner />
        ) : (
          <>
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

                      backgroundImage: `url(${
                        user.coverPic
                          ? `data:image/jpeg;base64,${user.coverPic}`
                          : profile.cover
                      })`,
                    }}
                  >
                    <div className="profile-container02">
                      <div className="profile-image03">
                        <Avatar
                          src={
                            user.profilePic
                              ? `data:image/jpeg;base64,${user.profilePic}`
                              : profile.image
                          }
                          size="xl"
                          style={{
                            borderRadius: '60%',
                            border: '0.1em solid white',
                            position: 'relative',
                            top: '-2em',
                            left: '2%',
                          }}
                        />
                      </div>
                      <div className="profile-container03">
                        <h1
                          className="profile-text02"
                          style={{
                            fontWeight: 700,
                            textShadow: '0px 0px 30px #00000085',
                            color: 'white',
                          }}
                        >
                          {user.firstName + ' ' + user.lastName} 👋🏼
                        </h1>
                        <span
                          className="profile-text04"
                          style={{
                            textShadow: '0px 0px 30px #00000085',
                            color: 'white',
                          }}
                        >
                          📧 {user.email}
                        </span>
                        {connection >= 0 && ( // only render this span if connections is positive
                          <span
                            className="profile-text03"
                            style={{
                              textShadow: '0px 0px 30px #00000085',
                              margin: '0.2em', // added margin to span
                              color: 'white',
                            }}
                          >
                            {`${connection} Connections`}
                          </span>
                        )}
                        {user.biography &&
                          user.workExperiences.length > 0 && ( // only render this span if biography and workExperiences are not empty
                            <span
                              className="profile-text06"
                              style={{
                                textShadow: '0px 0px 30px #000000B4',
                                color: 'white',
                              }}
                            >
                              💬{' '}
                              {`${user.biography} \u25CF  ${
                                user.workExperiences[user.workExperiences.length - 1]
                                  .title
                              } at ${
                                user.workExperiences[user.workExperiences.length - 1]
                                  .company
                              } `}
                            </span>
                          )}
                      </div>

                      <div className="profile-container05">
                        {Status.connected == true ? (
                          <>
                            <button
                              className="profile-button button"
                              style={{
                                color: buttonColors,
                                borderColor: buttonColors,
                                borderWidth: '2px',
                                textShadow: '0px 0px 40px #000000CA',
                                fontWeight: 600,
                                marginRight: '1em',
                                width: '100%',
                              }}
                              onClick={() => {
                                router.push(`/inbox/${router.query.id}`)
                              }}
                            >
                              <span>
                                <span>{t('message')}</span>
                              </span>
                            </button>
                            <button
                              className="profile-button button"
                              style={{
                                color: buttonColors,
                                borderColor: buttonColors,
                                borderWidth: '2px',
                                textShadow: '0px 0px 40px #000000CA',
                                fontWeight: 600,
                                marginRight: 'auto',
                                width: '100%', // added this line to make the button fill the available space
                              }}
                              onClick={Reject}
                            >
                              <span>
                                <span>{t('Remove')}</span>
                              </span>
                            </button>
                          </>
                        ) : Status.Requested == true ? (
                          <button
                            className="profile-button button"
                            style={{
                              color: buttonColors,
                              borderColor: buttonColors,
                              borderWidth: '2px',
                              textShadow: '0px 0px 40px #000000CA',
                              fontWeight: 600,
                              marginRight: '1em',
                              width: '60%',
                              margin: 'auto',
                            }}
                            onClick={Reject}
                          >
                            <span>
                              <span>{t('deleteRequest')}</span>
                            </span>
                          </button>
                        ) : Status.Pending == true ? (
                          <>
                            <button
                              className="profile-button button"
                              onClick={Accept}
                              style={{
                                color: buttonColors,
                                borderColor: buttonColors,
                                borderWidth: '2px',
                                textShadow: '0px 0px 40px #000000CA',
                                fontWeight: 600,
                                marginRight: '1em',
                              }}
                            >
                              <span>
                                <span> {t('accept')}</span>
                              </span>
                            </button>
                            <button
                              className="profile-button button"
                              onClick={Reject}
                              style={{
                                color: buttonColors,
                                borderColor: buttonColors,
                                borderWidth: '2px',
                                textShadow: '0px 0px 40px #000000CA',
                                fontWeight: 600,
                                marginRight: '1em',
                              }}
                            >
                              <span>
                                <span> {t('decline')}</span>
                              </span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="profile-button button"
                              onClick={Request}
                              style={{
                                color: buttonColors,
                                borderColor: buttonColors,
                                borderWidth: '2px',
                                textShadow: '0px 0px 40px #000000CA',
                                fontWeight: 600,

                                margin: 'auto',
                              }}
                            >
                              <span>
                                <span> {t('connect')}</span>
                              </span>
                            </button>
                          </>
                        )}

                        {/* to do: show this edit button only if user logged in == the profile that is shown */}
                      </div>
                    </div>
                  </div>
                </div>
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

                      backgroundImage: `url(${
                        user.coverPic
                          ? `data:image/jpeg;base64,${user.coverPic}`
                          : profile.cover
                      })`,
                    }}
                  >
                    <div className="profile-container02">
                      <div className="profile-image03">
                        <Avatar
                          src={
                            user.profilePic
                              ? `data:image/jpeg;base64,${user.profilePic}`
                              : profile.image
                          }
                          size="xl"
                          style={{
                            borderRadius: '60%',
                            border: '0.1em solid white',
                            position: 'relative',
                            top: '-2em',
                            left: '2%',
                          }}
                        />
                      </div>

                      <div
                        className="profile-container03"
                        style={{
                          position: 'relative',
                        }}
                      >
                        <h1
                          className="profile-text02"
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
                          className="profile-text04"
                          style={{
                            fontSize: '1.2em',
                            textShadow: '0px 0px 30px #00000085',
                            color: 'white',
                          }}
                        >
                          📧 {user.email}
                        </span>
                        {connection >= 0 && ( // only render this span if connections is positive
                          <span
                            className="profile-text03"
                            style={{
                              fontSize: '1em',
                              textShadow: '0px 0px 30px #00000085',
                              margin: '0.2em', // added margin to span
                              color: 'white',
                            }}
                          >
                            <span>{`${connection} Connections`}</span>
                          </span>
                        )}
                        {user.biography &&
                          user.workExperiences.length > 0 && ( // only render this span if biography and workExperiences are not empty
                            <span
                              className="profile-text06"
                              style={{
                                textShadow: '0px 0px 30px #000000B4',
                                color: 'white',
                              }}
                            >
                              💬{' '}
                              {`${user.biography} |  ${
                                user.workExperiences[user.workExperiences.length - 1]
                                  .title
                              } at ${
                                user.workExperiences[user.workExperiences.length - 1]
                                  .company
                              } `}
                            </span>
                          )}
                      </div>

                      <>
                        <div className="profile-container05">
                          {/* to do: show this edit button only if user logged in == the profile that is shown */}
                          <button
                            className="profile-button1 button"
                            style={{
                              color: 'white',
                              borderColor: 'white',
                              width: '100%',
                              borderWidth: '2px',
                              textShadow: '0px 0px 40px #000000CA',
                              fontWeight: 600,
                              marginLeft: '1.5em',
                            }}
                            onClick={() => {
                              router.push('/profile/editProfile')
                            }}
                          >
                            {t('edit')}
                          </button>
                        </div>
                      </>
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

                  {user.skills && user.skills.length ? (
                    <Skills skillsArray={user.skills} />
                  ) : (
                    <></>
                  )}

                  {/* AWARDS SECTION */}
                  {user.awards && user.awards.length ? (
                    <Awards awards={user.awards} />
                  ) : (
                    <></>
                  )}
                </Stack>

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

                {user.volunteeringExperience &&
                user.volunteeringExperience.length > 0 ? (
                  <Volunteering volunteer={user.volunteeringExperience} />
                ) : (
                  <></>
                )}
                <Divider />
                {/* RECOMMENDATIONS SECTION */}

                {user.recommendationsReceived &&
                user.recommendationsReceived.length > 0 ? (
                  <Recommendations rocommendations={user.recommendationsReceived} />
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
          </>
        )}
      </Layout>
    </>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default profile
