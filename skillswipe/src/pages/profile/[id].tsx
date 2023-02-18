import Layout from "@/components/Layout";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import ProfileStyle from "../../styles/profilestyle";
import {
  acceptRequest,
  getPendingRequest,
  getStatus,
  getUserById,
  removeConnection,
  sendRequest,
} from "../api/api";
import { toast } from "react-toastify";
import {
  Divider,
  Spinner,
  Stack,
  Toast,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Skills from "@/components/Profile/Skills/Skills";
import Awards from "@/components/Profile/Awards";
import WorkExperience from "@/components/Profile/WorkExperience";
import Education from "@/components/Profile/Education";
import Volunteering from "@/components/Profile/Volunteering";
import Recommendations from "@/components/Profile/Recommendations";
import PersonalProjectsProfile from "@/components/Profile/PersonalProjectsProfile";
import Courses from "@/components/Profile/Courses";

const profile = () => {
  const router = useRouter();
  const { toggleColorMode } = useColorMode();
  const buttonColors = useColorModeValue("black", "white");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    gender: "",
    profilePic: "",
    coverPic: "",
    biography: "",
  });
  const [Status, setStatus] = useState({
    connected: false,
    Requested: false,
    Pending: false,
  });
  const currentUser = useSelector((state) => state as any);

  useEffect(() => {
    console.log(Status);
  }, [Status]);

  const Request = () => {
    const token = localStorage.getItem("jwt");
    sendRequest(token, router.query.id)
      .then((reponse) => {
        setStatus({ ...Status, Requested: true });
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  const Accept = () => {
    const token = localStorage.getItem("jwt");
    acceptRequest(token, router.query.id)
      .then((reponse) => {
        setStatus({ ...Status, connected: true });
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  const Reject = () => {
    const token = localStorage.getItem("jwt");
    removeConnection(token, router.query.id)
      .then((reponse) => {
        setStatus({ connected: false, Requested: false, Pending: false });
      })
      .catch((error) => {
        toast(error.message);
      });
  };


  useEffect(() => {
    if (router.query.id) {
      console.log(currentUser);
      if (router.query.id == currentUser.auth.id) {
        console.log("same url");
        router.push("/home");
      } else {
        const token = localStorage.getItem("jwt");
        getUserById(token, router.query.id)
          .then((response: any) => {
            setUser(response.data.user);
            if (response.data.connectionStatus == "NotConnected") setStatus({ ...Status, connected: false });
            else {
              if (response.data.connectionStatus == "Pending") {
                getPendingRequest(token).then((response) => {
                  console.log(response);
                  if (response.data.length > 0) {
                    var found = false;
                    console.log(response.data);
                    response.data.map((element: any) => {
                      if (element.user.id == router.query.id) {
                        setStatus({ ...Status, Pending: true });
                        found = true;
                      }
                    });
                    if (found == false) {
                      setStatus({ ...Status, Requested: true });
                    }
                  } else {
                    setStatus({ ...Status, Requested: true });
                  }
                });
              } else {
                setStatus({ ...Status, connected: true });
              }
            }
            console.log(Status);
            setLoading(false);
          })
          .catch((error) => {
            toast("User not found");
            router.push("/");
          });
      }
    }
  }, [router.query]);

  const [profile, setProfile] = useState({
    image:
      "https://marketplace.canva.com/EAFKZzWYqqE/1/0/1600w/canva-purple-navy-neon-gradient-modern-minimalist-man-tiktok-profile-picture-kqzwo_88iLY.jpg",
    cover:
      "https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc",
  });

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
                  marginTop: "-3em",
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
                      user.profilePic
                        ? `data:image/jpeg;base64,${user.profilePic}`
                        : profile.image
                    }
                    className="profile-image"
                    style={{
                      aspectRatio: "1/1",
                      objectFit: "cover",
                    }}
                  />

                  <div
                    className="profile-container01"
                    style={{
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
                        fontSize: "1.5em",
                        fontWeight: 700,
                        textShadow: "0px 0px 30px #00000085",
                      }}
                    >
                      {user.firstName + " " + user.lastName}
                    </h1>
                    <span
                      className="profile-text02"
                      style={{
                        fontSize: "1em",
                        textShadow: "0px 0px 30px #00000085",
                      }}
                    >
                      {user.email}
                    </span>
                    <span
                      className="profile-text03"
                      style={{
                        fontSize: "1em",
                        textShadow: "0px 0px 30px #00000085",
                      }}
                    >
                      <span>{user.mobileNo}</span>
                      <br></br>
                    </span>
                    <div className="profile-container03">
                      <div className="profile-container04">
                        <span
                          className="profile-text06"
                          style={{
                            textShadow: "0px 0px 30px #000000B4",
                            marginLeft: "0px",
                          }}
                        >
                          {user.biography}
                        </span>
                      </div>
                    </div>

                    <div className="profile-container05">
                      {Status.connected == true ? (
                        <button
                          className="profile-button button"
                          style={{
                            color: buttonColors,
                            borderColor: buttonColors,
                            borderWidth: "2px",
                            textShadow: "0px 0px 40px #000000CA",
                            fontWeight: 600,
                            marginRight: "1em",
                          }}
                        >
                          <span>
                            <span>Message</span>
                          </span>
                        </button>
                      ) : Status.Requested == true ? (
                        <button
                          className="profile-button button"
                          style={{
                            color: buttonColors,
                            borderColor: buttonColors,
                            borderWidth: "2px",
                            textShadow: "0px 0px 40px #000000CA",
                            fontWeight: 600,
                            marginRight: "1em",
                          }}
                          onClick={Reject}
                        >
                          <span>
                            <span>Delete Request</span>
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
                              borderWidth: "2px",
                              textShadow: "0px 0px 40px #000000CA",
                              fontWeight: 600,
                              marginRight: "1em",
                            }}
                          >
                            <span>
                              <span>Accept</span>
                            </span>
                          </button>
                          <button
                            className="profile-button button"
                            onClick={Reject}
                            style={{
                              color: buttonColors,
                              borderColor: buttonColors,
                              borderWidth: "2px",
                              textShadow: "0px 0px 40px #000000CA",
                              fontWeight: 600,
                              marginRight: "1em",
                            }}
                          >
                            <span>
                              <span>Decline</span>
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
                              borderWidth: "2px",
                              textShadow: "0px 0px 40px #000000CA",
                              fontWeight: 600,
                              marginRight: "1em",
                            }}
                          >
                            <span>
                              <span>Connect</span>
                            </span>
                          </button>
                        </>
                      )}

                      {/* to do: show this edit button only if user logged in == the profile that is shown */}
                    </div>
                  </div>
                </div>
                <Stack
              direction={"row"}
              paddingTop="1rem"
              style={{
                flexWrap: "wrap",
              }}
            >
              {/* SKILLS SECTION */}
              <Skills skillsArray ={user.skills} />
              {/* AWARDS SECTION */}
              <Awards awards={user.awards} />
            </Stack >

            <br></br>
            <Divider />
            {/* CAREER JOURNEY WORK EXPERIENCE */}
            <WorkExperience experience={user.workExperiences}/>
            <Divider />
            {/* EDUCATION SECTION */}
            <Education education={user.educations} />
            <Divider />
            {/* VOLUNTEERING SECTION */}
            <Volunteering volunteer={user.volunteeringExperience} />
            <Divider />
            {/* RECOMMENDATIONS SECTION */}
            <Recommendations rocommendations={user.recommendationsReceived} />
            <Divider />
            {/* PERSONAL PROJECTS */}
            <PersonalProjectsProfile Project={user.projects} />
            <Divider />

            {/* COURSES ACCOMPLISHED */}
            <Courses courses={user.courses} />
            {/* temporary div below for spacing under page, will need to remove in final sprint */}
            <div
              style={{
                display: "flex",
                paddingBottom: "10em",
              }}
            ></div>

                

                
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};
export default profile;
