// OLD PROFILE CODE:
/* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Flex,
//   Text,
//   Image,
//   Stack,
//   Divider,
//   useColorModeValue,
//   useColorMode,
//   Button,
//   SimpleGrid,
// } from "@chakra-ui/react";
// import NavBar from "../components/NavBar";
// import Layout from "@/components/Layout";
// import { checkLogin } from "./api/api";

// var borderWidth = "3px";
// var boxBorder = "30";

// const Profile = () => {
//   useEffect(() => {
//     if (localStorage.getItem("jwt")) {
//       checkLogin(localStorage.getItem("jwt"))
//         .then((Response) => {
//           setProfile({
//             ...profile,
//             name: Response.data.firstName + " " + Response.data.lastName,
//           });
//         })
//         .catch((error) => {});
//     }
//   }, []);
//   const [profile, setProfile] = useState({
//     name: "John Smith",
//     title: "Software Engineer",
//     location: "Montreal ,QC, CA",
//     school: "Concordia University",
//     experience: "Five years of experience in full stack development",
//     experience2: "Three years of experience in mobile development",
//     experience3: "Two years of experience in data analysis",
//     image:
//       "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640",
//     cover:
//       "https://www.uidownload.com/files/864/934/332/abstract-background-with-modern-gradient.jpg",
//   });
//   const { toggleColorMode } = useColorMode();
//   const formBorder = useColorModeValue("gray.300", "gray.600");
//   const toggleTheme = useColorModeValue("🌙", "💡");

//   const [employmentHistory, setEmploymentHistory] = useState([
//     {
//       company: "ABC Inc",
//       position: "Software Engineer",
//       duration: "January 2020 - Present",
//       description:
//         "Working on building and maintaining the company's e-commerce platform using React and Node.js.",
//     },
//     {
//       company: "DEF Corp",
//       position: "Full Stack Developer",
//       duration: "June 2016 - December 2019",
//       description:
//         "Developed and implemented several features for the company's CRM system using Ruby on Rails and JavaScript.",
//     },
//   ]);

//   const handleEdit = () => {
//     setProfile({
//       ...profile,
//       name: "Full Name",
//       title: "Software Engineer",
//       location: "Montreal ,QC, CA",
//       experience: "Five years of experience in full stack development",
//       experience2: "Three years of experience in mobile development",
//       experience3: "Two years of experience in data analysis",
//       image:
//         "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640",
//       cover:
//         "https://media.istockphoto.com/id/931318336/photo/holographic-foil-blurred-abstract-background-for-trendy-design.jpg?s=612x612&w=0&k=20&c=X62G7tOcp3_1IKBPfpwf8ASp99IseNFpTdINcb6RqJA=",
//     });
//   };

//   const postBackground = useColorModeValue("gray.100", "gray.700");
//   function setIsEditing(arg0: boolean): void {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <>
//       <Layout>
//         <NavBar />
//         <Flex
//           direction="column"
//           paddingRight={"1em"}
//           paddingBottom={"1em"}
//           paddingLeft={"1em"}
//         >
//           <Stack
//             borderWidth={borderWidth}
//             borderColor={formBorder}
//             backgroundColor={postBackground} // we should make this blurred so that the cover shows through a bit
//             marginBottom="1rem"
//             rounded={boxBorder}
//             overflow="hidden"
//             width="100%"
//             minW="80vw"
//             maxW="90vw"
//             boxShadow="lg"
//           >
//             <Image
//               src={profile.cover}
//               alt=""
//               w="100%"
//               h="300px"
//               bg="gray.100"
//               rounded="lg"
//               mb={6}
//               objectFit="cover"
//             />
//             <Flex align="center" direction={["column", "column", "row", "row"]}>
//               <Image
//                 src={profile.image}
//                 alt=""
//                 w="150px"
//                 h="150px"
//                 rounded="full"
//                 objectFit={"cover"}
//                 mr={6}
//                 mb={6}
//                 marginLeft={10}
//                 boxShadow="lg"
//               />
//               <Stack ml={6}>
//                 <Text fontSize="2xl" fontWeight="bold">
//                   {profile.name}
//                 </Text>
//                 <Text fontSize="lg" fontWeight="medium">
//                   {profile.title}
//                 </Text>
//                 <Text fontSize="sm">{profile.location}</Text>
//                 <SimpleGrid columns={2} spacingX={1} spacingY={1}>
//                   <Text>{profile.school}</Text>
//                   <Button
//                     justifySelf={"flex-end"}
//                     variant="outline"
//                     size="md"
//                     borderRadius={1000}
//                     colorScheme="blue"
//                     justifyContent={"flex-end"}
//                     onClick={() => setIsEditing(!setIsEditing)}
//                   >
//                     Edit
//                   </Button>
//                 </SimpleGrid>
//               </Stack>
//             </Flex>
//           </Stack>
//           <Divider my={6} w="100%" />

//           <Stack>
//             <Box
//               borderWidth={borderWidth}
//               borderColor={formBorder}
//               backgroundColor={postBackground}
//               padding="1rem"
//               marginBottom="1rem"
//               rounded={boxBorder}
//               overflow="hidden"
//               width="100%"
//               minW="80vw"
//               maxW="90vw"
//               boxShadow="lg"
//             >
//               <SimpleGrid columns={2} spacingX={1} spacingY={1}>
//                 <Text
//                   fontSize="lg"
//                   fontWeight="medium"
//                   mb={2}
//                   marginLeft={"1rem"}
//                   display="inline-block"
//                 >
//                   Personal Experience
//                 </Text>
//                 <Button
//                   justifySelf={"flex-end"}
//                   variant="outline"
//                   size="md"
//                   borderRadius={1000}
//                   colorScheme="blue"
//                   justifyContent={"flex-end"}
//                   onClick={() => setIsEditing(!setIsEditing)}
//                 >
//                   Edit
//                 </Button>
//               </SimpleGrid>

//               <Stack marginTop={"1rem"} marginLeft={"2rem"}>
//                 <ol>
//                   <li>
//                     <Text fontSize="sm" marginBottom={"1rem"}>
//                       {profile.experience}
//                     </Text>
//                   </li>
//                   <li>
//                     <Text fontSize="sm" marginBottom={"1rem"}>
//                       {profile.experience2}
//                     </Text>
//                   </li>
//                   <li>
//                     <Text fontSize="sm" marginBottom={"1rem"}>
//                       {profile.experience3}
//                     </Text>
//                   </li>
//                 </ol>
//               </Stack>
//             </Box>
//           </Stack>

//           <Box
//             borderWidth={borderWidth}
//             borderColor={formBorder}
//             backgroundColor={postBackground}
//             padding="1rem"
//             marginBottom="1rem"
//             rounded={boxBorder}
//             overflow="hidden"
//             width="100%"
//             minW="80vw"
//             maxW="90vw"
//             boxShadow="lg"
//           >
//             <SimpleGrid columns={2} spacingX={0} spacingY={1}>
//               <Text fontSize="lg" fontWeight="medium" mb={2} ml={2}>
//                 Employment History:
//               </Text>

//               <Button
//                 justifySelf={"flex-end"}
//                 variant="outline"
//                 size="md"
//                 borderRadius={1000}
//                 colorScheme="blue"
//                 justifyContent={"flex-end"}
//                 onClick={() => setIsEditing(!setIsEditing)}
//                 marginBottom={"1rem"}
//               >
//                 Edit
//               </Button>
//             </SimpleGrid>
//             {employmentHistory.map((history, index) => (
//               // eslint-disable-next-line react/jsx-key
//               <SimpleGrid columns={4} spacingX={0} spacingY={1} ml={2}>
//                 <Text fontWeight="bold">{history.company}</Text>
//                 <Text>{history.position}</Text>
//                 <Text>{history.duration}</Text>
//                 <Text>{history.description}</Text>
//               </SimpleGrid>
//             ))}
//           </Box>
//         </Flex>
//       </Layout>
//     </>
//   );
// };

// export default Profile;

//PROFILE PAGE V2
import React from "react";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import FeatureCard4 from "../components/feature-card4";

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="home-container">
        <Head>
          <title>SkillSwipe</title>
          <meta property="og:title" content="SkillSwipe" />
        </Head>
        <div className="home-top-card">
          <img
            alt="image"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDd8fHBvcnRyYWl0fGVufDB8fHx8MTYyNjM3ODk3Mg&amp;ixlib=rb-1.2.1&amp;w=1500"
            className="home-image"
          />
          <div className="home-container01">
            <div className="home-container02">
              <span className="home-text">Software Engineer @ company</span>
            </div>
            <h1
              className="home-text01"
              style={{
                fontSize: "1.5em",
                fontWeight: 700,
              }}
            >
              Name Name
            </h1>
            <span
              className="home-text02"
              style={{
                fontSize: "1em",
              }}
            >
              Concordia University
            </span>
            <span
              className="home-text03"
              style={{
                fontSize: "1em",
              }}
            >
              <span>Montreal, Canada</span>
              <br></br>
            </span>
            <div className="home-container03">
              <div className="home-container04">
                <span className="home-text06">I&apos;m great at _____</span>
              </div>
              <div className="home-container05">
                <button className="home-button button">
                  <span>
                    <span>Message</span>
                    <br></br>
                  </span>
                </button>
                <button className="home-button1 button">Connect</button>
              </div>
            </div>
          </div>
        </div>
        <div className="home-steps">
          <h1 className="home-text10">Career Journey</h1>
          <span className="home-text11">
            <span>i do bits and bytes for a living</span>
            <br></br>
          </span>
          <div className="home-container06">
            <div className="home-step">
              <div className="home-container07">
                <div className="home-line"></div>
                <div className="home-container08">
                  <svg viewBox="0 0 1024 1024" className="home-icon">
                    <path d="M634 558q92-64 92-174 0-88-63-151t-151-63-151 63-63 151q0 46 27 96t65 78l36 26v98h172v-98zM512 86q124 0 211 87t87 211q0 156-128 244v98q0 18-12 30t-30 12h-256q-18 0-30-12t-12-30v-98q-128-88-128-244 0-124 87-211t211-87zM384 896v-42h256v42q0 18-12 30t-30 12h-172q-18 0-30-12t-12-30z"></path>
                  </svg>
                </div>
                <div className="home-line1"></div>
              </div>
              <div className="home-container09">
                <h1 className="home-text14">
                  <span>Genetec</span>
                  <br></br>
                </h1>
                <h3 className="home-heading">2012 - 2014</h3>
                <span className="home-text17">
                  <span>Software Engineer Intern</span>
                  <br></br>
                </span>
              </div>
            </div>
            <div className="home-step1">
              <div className="home-container10">
                <div className="home-line2"></div>
                <div className="home-container11">
                  <svg viewBox="0 0 1024 1024" className="home-icon2">
                    <path d="M746 512q26 0 45-18t19-46-19-46-45-18-45 18-19 46 19 46 45 18zM618 342q26 0 45-19t19-45-19-45-45-19-45 19-19 45 19 45 45 19zM406 342q26 0 45-19t19-45-19-45-45-19-45 19-19 45 19 45 45 19zM278 512q26 0 45-18t19-46-19-46-45-18-45 18-19 46 19 46 45 18zM512 128q158 0 271 100t113 242q0 88-63 150t-151 62h-74q-28 0-46 19t-18 45q0 22 16 42t16 44q0 28-18 46t-46 18q-160 0-272-112t-112-272 112-272 272-112z"></path>
                  </svg>
                </div>
                <div className="home-line3"></div>
              </div>
              <div className="home-container12">
                <h1 className="home-text20">
                  <span>Twitter</span>
                  <br></br>
                </h1>
                <h3 className="home-heading1">2014 - 2015</h3>
                <h1 className="home-text23"></h1>
                <span className="home-text24">
                  <span>Launched Edit Button</span>
                  <br></br>
                </span>
              </div>
            </div>
            <div className="home-step2">
              <div className="home-container13">
                <div className="home-line4"></div>
                <div className="home-container14">
                  <svg viewBox="0 0 1024 1024" className="home-icon4">
                    <path d="M576 736l96 96 320-320-320-320-96 96 224 224z"></path>
                    <path d="M448 288l-96-96-320 320 320 320 96-96-224-224z"></path>
                  </svg>
                </div>
                <div className="home-line5"></div>
              </div>
              <div className="home-container15">
                <h1 className="home-text27">
                  <span>Facebook</span>
                  <br></br>
                </h1>
                <h3 className="home-heading2">2015 - 2018</h3>
                <span className="home-text30">
                  <span>Co-Created React Native</span>
                  <br></br>
                </span>
              </div>
            </div>
            <div className="home-step3">
              <div className="home-container16">
                <div className="home-line6"></div>
                <div className="home-container17">
                  <svg viewBox="0 0 1024 1024" className="home-icon7">
                    <path d="M480 64c-265.096 0-480 214.904-480 480 0 265.098 214.904 480 480 480 265.098 0 480-214.902 480-480 0-265.096-214.902-480-480-480zM751.59 704c8.58-40.454 13.996-83.392 15.758-128h127.446c-3.336 44.196-13.624 87.114-30.68 128h-112.524zM208.41 384c-8.58 40.454-13.996 83.392-15.758 128h-127.444c3.336-44.194 13.622-87.114 30.678-128h112.524zM686.036 384c9.614 40.962 15.398 83.854 17.28 128h-191.316v-128h174.036zM512 320v-187.338c14.59 4.246 29.044 11.37 43.228 21.37 26.582 18.74 52.012 47.608 73.54 83.486 14.882 24.802 27.752 52.416 38.496 82.484h-155.264zM331.232 237.516c21.528-35.878 46.956-64.748 73.54-83.486 14.182-10 28.638-17.124 43.228-21.37v187.34h-155.264c10.746-30.066 23.616-57.68 38.496-82.484zM448 384v128h-191.314c1.88-44.146 7.666-87.038 17.278-128h174.036zM95.888 704c-17.056-40.886-27.342-83.804-30.678-128h127.444c1.762 44.608 7.178 87.546 15.758 128h-112.524zM256.686 576h191.314v128h-174.036c-9.612-40.96-15.398-83.854-17.278-128zM448 768v187.34c-14.588-4.246-29.044-11.372-43.228-21.37-26.584-18.74-52.014-47.61-73.54-83.486-14.882-24.804-27.75-52.418-38.498-82.484h155.266zM628.768 850.484c-21.528 35.876-46.958 64.746-73.54 83.486-14.184 9.998-28.638 17.124-43.228 21.37v-187.34h155.266c-10.746 30.066-23.616 57.68-38.498 82.484zM512 704v-128h191.314c-1.88 44.146-7.666 87.040-17.28 128h-174.034zM767.348 512c-1.762-44.608-7.178-87.546-15.758-128h112.524c17.056 40.886 27.344 83.806 30.68 128h-127.446zM830.658 320h-95.9c-18.638-58.762-44.376-110.294-75.316-151.428 42.536 20.34 81.058 47.616 114.714 81.272 21.48 21.478 40.362 44.938 56.502 70.156zM185.844 249.844c33.658-33.658 72.18-60.932 114.714-81.272-30.942 41.134-56.676 92.666-75.316 151.428h-95.898c16.138-25.218 35.022-48.678 56.5-70.156zM129.344 768h95.898c18.64 58.762 44.376 110.294 75.318 151.43-42.536-20.34-81.058-47.616-114.714-81.274-21.48-21.478-40.364-44.938-56.502-70.156zM774.156 838.156c-33.656 33.658-72.18 60.934-114.714 81.274 30.942-41.134 56.678-92.668 75.316-151.43h95.9c-16.14 25.218-35.022 48.678-56.502 70.156z"></path>
                  </svg>
                </div>
                <div className="home-line7"></div>
              </div>
              <div className="home-container18">
                <h1 className="home-text33">
                  <span>Instagram</span>
                  <br></br>
                </h1>
                <h3 className="home-heading3">2018 - Present</h3>
                <span className="home-text36">
                  <span>Working</span>
                  <br></br>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-personal-projects">
          <h1 className="home-text39">Personal Projects</h1>
          <div className="home-separator"></div>
          <div className="home-container19">
            <div className="home-container20">
              <FeatureCard4 rootClassName="rootClassName1"></FeatureCard4>
              <FeatureCard4 rootClassName="rootClassName4"></FeatureCard4>
              <FeatureCard4 rootClassName="rootClassName3"></FeatureCard4>
              <FeatureCard4 rootClassName="rootClassName2"></FeatureCard4>
            </div>
            <img
              alt="image"
              src="https://images.unsplash.com/photo-1661961110372-8a7682543120?ixid=Mnw5MTMyMXwxfDF8YWxsfDExfHx8fHx8Mnx8MTY3NTIyMDk5NA&amp;ixlib=rb-4.0.3&amp;w=500"
              loading="lazy"
              className="home-image1"
            />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .home-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .home-top-card {
            width: 100%;
            display: flex;
            max-width: 100%;
            box-shadow: 4px 4px 10px 0px rgba(18, 18, 18, 0.1);
            align-items: stretch;
            flex-direction: row;
            justify-content: space-between;
          }
          .home-image {
            width: auto;
            height: 20em;
            align-self: center;
            object-fit: cover;
            flex-shrink: 0;
            border-radius: 0px;
          }
          .home-container01 {
            flex: 1;
            width: auto;
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-space-space-twounits);
            padding-left: var(--dl-space-space-twounits);
            padding-right: var(--dl-space-space-twounits);
            flex-direction: column;
            padding-bottom: var(--dl-space-space-twounits);
            background-size: cover;
            justify-content: space-between;
            background-image: url("https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc");
          }
          .home-container02 {
            width: 100%;
            display: flex;
            align-items: flex-start;
            margin-bottom: var(--dl-space-space-halfunit);
            flex-direction: row;
            justify-content: space-between;
          }
          .home-text {
            color: var(--dl-color-gray-500);
            font-weight: 600;
            text-transform: uppercase;
          }
          .home-text01 {
            margin-bottom: var(--dl-space-space-twounits);
          }
          .home-text02 {
            color: var(--dl-color-gray-500);
            font-size: 1.25rem;
            margin-bottom: 0px;
          }
          .home-text03 {
            color: var(--dl-color-gray-500);
            font-size: 1.25rem;
            margin-bottom: 0px;
          }
          .home-container03 {
            flex: 0 0 auto;
            width: auto;
            height: 92px;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .home-container04 {
            width: 195px;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .home-text06 {
            font-style: normal;
            font-weight: 600;
            margin-left: var(--dl-space-space-halfunit);
          }
          .home-container05 {
            width: 219px;
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .home-button {
            border-radius: 60px;
            background-color: transparent;
          }
          .home-button1 {
            border-radius: 60px;
            background-color: transparent;
          }
          .home-steps {
            width: 100%;
            display: flex;
            padding: var(--dl-space-space-threeunits);
            max-width: var(--dl-size-size-maxwidth);
            align-self: center;
            align-items: center;
            align-content: center;
            flex-direction: column;
          }
          .home-text10 {
            font-size: 3rem;
          }
          .home-text11 {
            color: var(--dl-color-gray-700);
            font-size: 1.15rem;
            max-width: 600px;
            margin-top: var(--dl-space-space-unit);
            text-align: center;
            margin-bottom: var(--dl-space-space-unit);
          }
          .home-container06 {
            flex: 0 0 auto;
            width: auto;
            display: flex;
            align-items: flex-start;
            align-content: initial;
            flex-direction: row;
          }
          .home-step {
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .home-container07 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: center;
            padding-top: var(--dl-space-space-unit);
            padding-left: 2px;
            padding-right: 2px;
            flex-direction: row;
            justify-content: center;
          }
          .home-line {
            flex: 1;
            height: 0px;
            display: flex;
            align-items: flex-start;
            border-color: transparent;
            border-style: dashed;
            border-width: 2px;
            flex-direction: row;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
          }
          .home-container08 {
            flex: 0 0 auto;
            width: var(--dl-size-size-small);
            height: var(--dl-size-size-small);
            display: flex;
            align-items: center;
            border-radius: var(--dl-radius-radius-round);
            flex-direction: row;
            justify-content: center;
            background-color: #f5f5f5ff;
          }
          .home-icon {
            fill: var(--dl-color-gray-500);
            width: 24px;
            height: 24px;
          }
          .home-line1 {
            flex: 1;
            height: 0px;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-gray-900);
            border-style: dashed;
            border-width: 2px;
            flex-direction: row;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
          }
          .home-container09 {
            display: flex;
            align-items: center;
            padding-top: var(--dl-space-space-unit);
            padding-left: var(--dl-space-space-twounits);
            padding-right: var(--dl-space-space-twounits);
            flex-direction: column;
            padding-bottom: var(--dl-space-space-unit);
          }
          .home-text14 {
            font-size: 1.5rem;
            text-align: center;
            font-weight: 500;
            margin-bottom: var(--dl-space-space-unit);
          }
          .home-heading {
            font-size: 1.5rem;
            text-align: center;
            font-weight: 500;
            margin-bottom: var(--dl-space-space-unit);
          }
          .home-text17 {
            color: var(--dl-color-gray-500);
            font-size: 0.75rem;
            text-align: center;
          }
          .home-step1 {
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .home-container10 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: center;
            padding-top: var(--dl-space-space-unit);
            padding-left: 2px;
            padding-right: 2px;
            flex-direction: row;
            justify-content: center;
          }
          .home-line2 {
            flex: 1;
            height: 0px;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-gray-900);
            border-style: dashed;
            border-width: 2px;
            flex-direction: row;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
          }
          .home-container11 {
            flex: 0 0 auto;
            width: var(--dl-size-size-small);
            height: var(--dl-size-size-small);
            display: flex;
            align-items: center;
            border-radius: var(--dl-radius-radius-round);
            flex-direction: row;
            justify-content: center;
            background-color: #f5f5f5ff;
          }
          .home-icon2 {
            fill: var(--dl-color-gray-500);
            width: 24px;
            height: 24px;
          }
          .home-line3 {
            flex: 1;
            height: 0px;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-gray-900);
            border-style: dashed;
            border-width: 2px;
            flex-direction: row;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
          }
          .home-container12 {
            display: flex;
            align-items: center;
            padding-top: var(--dl-space-space-unit);
            padding-left: var(--dl-space-space-twounits);
            padding-right: var(--dl-space-space-twounits);
            flex-direction: column;
            padding-bottom: var(--dl-space-space-unit);
          }
          .home-text20 {
            font-size: 1.5rem;
            text-align: center;
            font-weight: 500;
            margin-bottom: var(--dl-space-space-unit);
          }
          .home-heading1 {
            font-size: 1.5rem;
            text-align: center;
            font-weight: 500;
            margin-bottom: var(--dl-space-space-unit);
          }
          .home-text23 {
            font-size: 1.5rem;
            text-align: center;
            font-weight: 500;
            margin-bottom: var(--dl-space-space-unit);
          }
          .home-text24 {
            color: var(--dl-color-gray-500);
            font-size: 0.75rem;
            text-align: center;
          }
          .home-step2 {
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .home-container13 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: center;
            padding-top: var(--dl-space-space-unit);
            padding-left: 2px;
            padding-right: 2px;
            flex-direction: row;
            justify-content: center;
          }
          .home-line4 {
            flex: 1;
            height: 0px;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-gray-900);
            border-style: dashed;
            border-width: 2px;
            flex-direction: row;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
          }
          .home-container14 {
            flex: 0 0 auto;
            width: var(--dl-size-size-small);
            height: var(--dl-size-size-small);
            display: flex;
            align-items: center;
            border-radius: var(--dl-radius-radius-round);
            flex-direction: row;
            justify-content: center;
            background-color: #f5f5f5ff;
          }
          .home-icon4 {
            fill: var(--dl-color-gray-500);
            width: 24px;
            height: 24px;
          }
          .home-line5 {
            flex: 1;
            height: 0px;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-gray-900);
            border-style: dashed;
            border-width: 2px;
            flex-direction: row;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
          }
          .home-container15 {
            display: flex;
            align-items: center;
            padding-top: var(--dl-space-space-unit);
            padding-left: var(--dl-space-space-twounits);
            padding-right: var(--dl-space-space-twounits);
            flex-direction: column;
            padding-bottom: var(--dl-space-space-unit);
          }
          .home-text27 {
            font-size: 1.5rem;
            text-align: center;
            font-weight: 500;
            margin-bottom: var(--dl-space-space-unit);
          }
          .home-heading2 {
            font-size: 1.5rem;
            text-align: center;
            font-weight: 500;
            margin-bottom: var(--dl-space-space-unit);
          }
          .home-text30 {
            color: var(--dl-color-gray-500);
            font-size: 0.75rem;
            text-align: center;
          }
          .home-step3 {
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .home-container16 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: center;
            padding-top: var(--dl-space-space-unit);
            padding-left: 2px;
            padding-right: 2px;
            flex-direction: row;
            justify-content: center;
          }
          .home-line6 {
            flex: 1;
            height: 0px;
            display: flex;
            align-items: flex-start;
            border-color: var(--dl-color-gray-900);
            border-style: dashed;
            border-width: 2px;
            flex-direction: row;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
          }
          .home-container17 {
            flex: 0 0 auto;
            width: var(--dl-size-size-small);
            height: var(--dl-size-size-small);
            display: flex;
            align-items: center;
            border-radius: var(--dl-radius-radius-round);
            flex-direction: row;
            justify-content: center;
            background-color: #f5f5f5ff;
          }
          .home-icon7 {
            fill: var(--dl-color-gray-500);
            width: 24px;
            height: 24px;
          }
          .home-line7 {
            flex: 1;
            height: 0px;
            display: flex;
            align-items: flex-start;
            border-color: transparent;
            border-style: dashed;
            border-width: 2px;
            flex-direction: row;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
          }
          .home-container18 {
            display: flex;
            align-items: center;
            padding-top: var(--dl-space-space-unit);
            padding-left: var(--dl-space-space-twounits);
            padding-right: var(--dl-space-space-twounits);
            flex-direction: column;
            padding-bottom: var(--dl-space-space-unit);
          }
          .home-text33 {
            font-size: 1.5rem;
            text-align: center;
            font-weight: 500;
            margin-bottom: var(--dl-space-space-unit);
          }
          .home-heading3 {
            font-size: 1.5rem;
            text-align: center;
            font-weight: 500;
            margin-bottom: var(--dl-space-space-unit);
          }
          .home-text36 {
            color: var(--dl-color-gray-500);
            font-size: 0.75rem;
            text-align: center;
          }
          .home-personal-projects {
            width: 100%;
            display: flex;
            padding: var(--dl-space-space-threeunits);
            max-width: var(--dl-size-size-maxwidth);
            flex-direction: column;
          }
          .home-text39 {
            font-size: 3rem;
            margin-bottom: var(--dl-space-space-twounits);
          }
          .home-separator {
            width: 100px;
            height: 2px;
            background-color: var(--dl-color-gray-500);
          }
          .home-container19 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            margin-top: var(--dl-space-space-twounits);
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
          }
          .home-container20 {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          .home-image1 {
            width: 450px;
            height: 450px;
            object-fit: cover;
            flex-shrink: 0;
            margin-left: var(--dl-space-space-fourunits);
            border-radius: var(--dl-radius-radius-round);
            object-position: left;
          }
          @media (max-width: 1600px) {
            .home-top-card {
              height: 331px;
            }
            .home-image {
              width: auto;
              height: inherit;
            }
            .home-text02 {
              margin-bottom: var(--dl-space-space-halfunit);
            }
            .home-container04 {
              width: 174px;
              height: 60px;
              margin-right: 0px;
            }
            .home-container05 {
              width: 216px;
              height: 60px;
              margin-right: 90px;
            }
            .home-button {
              border-radius: 60px;
              background-color: transparent;
            }
            .home-button1 {
              border-radius: 60px;
              background-color: transparent;
            }
            .home-text10 {
              font-size: 3rem;
            }
            .home-text11 {
              color: var(--dl-color-gray-700);
              font-size: 1.15rem;
            }
            .home-container09 {
              width: 274px;
              height: 130px;
            }
            .home-text14 {
              font-size: 1.5rem;
              margin-bottom: var(--dl-space-space-halfunit);
            }
            .home-heading {
              font-size: 1rem;
            }
            .home-text17 {
              color: var(--dl-color-gray-500);
            }
            .home-text20 {
              font-size: 1.5rem;
              font-weight: 500;
              margin-bottom: var(--dl-space-space-halfunit);
            }
            .home-heading1 {
              font-size: 1rem;
              font-weight: 500;
            }
            .home-text23 {
              font-size: 1.5rem;
            }
            .home-text24 {
              color: var(--dl-color-gray-500);
            }
            .home-text27 {
              font-size: 1.5rem;
              font-weight: 500;
              margin-bottom: var(--dl-space-space-halfunit);
            }
            .home-heading2 {
              font-size: 1rem;
              font-weight: 500;
            }
            .home-text30 {
              color: var(--dl-color-gray-500);
              font-size: 0.75rem;
            }
            .home-text33 {
              font-size: 1.5rem;
              font-weight: 500;
              margin-bottom: var(--dl-space-space-halfunit);
            }
            .home-heading3 {
              font-size: 1rem;
              font-weight: 500;
            }
            .home-text36 {
              color: var(--dl-color-gray-500);
            }
            .home-text39 {
              font-size: 3rem;
            }
          }
          @media (max-width: 991px) {
            .home-top-card {
              height: 300px;
              flex-direction: row;
              justify-content: space-between;
            }
            .home-image {
              width: 299px;
              height: inherit;
            }
            .home-container01 {
              flex: 1;
              height: 100%;
              align-self: stretch;
              background-position: center;
            }
            .home-text {
              color: var(--dl-color-gray-500);
            }
            .home-text01 {
              margin-bottom: var(--dl-space-space-halfunit);
            }
            .home-text02 {
              color: var(--dl-color-gray-500);
            }
            .home-text03 {
              color: var(--dl-color-gray-500);
            }
            .home-container04 {
              width: 191px;
              margin-right: var(--dl-space-space-halfunit);
              justify-content: space-between;
            }
            .home-text06 {
              font-style: normal;
              font-weight: 600;
              margin-right: var(--dl-space-space-fourunits);
            }
            .home-container05 {
              width: 225px;
              margin-right: 0px;
              justify-content: space-between;
            }
            .home-button {
              border-radius: 60px;
              background-color: transparent;
            }
            .home-button1 {
              border-radius: 60px;
              background-color: transparent;
            }
            .home-text10 {
              text-align: center;
            }
            .home-text11 {
              text-align: center;
            }
            .home-personal-projects {
              align-items: center;
            }
            .home-container19 {
              flex-direction: column;
            }
            .home-image1 {
              width: 300px;
              height: 300px;
              margin-top: var(--dl-space-space-twounits);
              margin-left: 0px;
            }
          }
          @media (max-width: 767px) {
            .home-top-card {
              flex-direction: column;
              margin-bottom: 28em;
            }
            .home-image {
              width: 100%;
              height: 429px;
            }
            .home-container04 {
              padding-right: 0px;
            }
            .home-button {
              border-radius: 60px;
              background-color: transparent;
            }
            .home-button1 {
              border-radius: 60px;
              background-color: transparent;
            }
            .home-steps {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
            .home-container06 {
              align-items: flex-start;
              padding-left: var(--dl-space-space-fiveunits);
              flex-direction: column;
            }
            .home-step {
              width: 100%;
              height: auto;
              flex-direction: row;
              justify-content: center;
            }
            .home-container07 {
              width: var(--dl-size-size-small);
              height: auto;
              align-self: stretch;
              padding-top: 0px;
              padding-left: 0px;
              padding-right: 0px;
              flex-direction: column;
              padding-bottom: 2px;
              justify-content: space-between;
            }
            .home-line1 {
              border-color: var(--dl-color-gray-900);
              border-style: dashed;
              border-top-width: 0px;
              border-left-width: 2px;
            }
            .home-container09 {
              width: 100%;
              align-items: flex-start;
              padding-top: var(--dl-space-space-twounits);
              flex-direction: column;
              padding-bottom: var(--dl-space-space-twounits);
              justify-content: space-between;
            }
            .home-text14 {
              margin-top: var(--dl-space-space-twounits);
              margin-left: 0px;
              margin-right: 0px;
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-heading {
              margin-top: var(--dl-space-space-twounits);
              margin-left: 0px;
              margin-right: 0px;
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-text17 {
              text-align: left;
            }
            .home-step1 {
              width: 100%;
              height: auto;
              flex-direction: row;
              justify-content: center;
            }
            .home-container10 {
              width: var(--dl-size-size-small);
              height: auto;
              align-self: stretch;
              padding-top: 0px;
              padding-left: 0px;
              padding-right: 0px;
              flex-direction: column;
              padding-bottom: 2px;
              justify-content: space-between;
            }
            .home-line2 {
              border-top-width: 0px;
              border-left-width: 2px;
            }
            .home-line3 {
              border-color: var(--dl-color-gray-900);
              border-style: dashed;
              border-top-width: 0px;
              border-left-width: 2px;
            }
            .home-container12 {
              width: 100%;
              align-items: flex-start;
              padding-top: var(--dl-space-space-twounits);
              flex-direction: column;
              padding-bottom: var(--dl-space-space-twounits);
              justify-content: space-between;
            }
            .home-text20 {
              margin-top: var(--dl-space-space-twounits);
              margin-left: 0px;
              margin-right: 0px;
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-heading1 {
              margin-top: var(--dl-space-space-twounits);
              margin-left: 0px;
              margin-right: 0px;
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-text23 {
              margin-top: var(--dl-space-space-twounits);
              margin-left: 0px;
              margin-right: 0px;
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-text24 {
              text-align: left;
            }
            .home-step2 {
              width: 100%;
              height: auto;
              flex-direction: row;
              justify-content: center;
            }
            .home-container13 {
              width: var(--dl-size-size-small);
              height: auto;
              align-self: stretch;
              padding-top: 0px;
              padding-left: 0px;
              padding-right: 0px;
              flex-direction: column;
              padding-bottom: 2px;
              justify-content: space-between;
            }
            .home-line4 {
              border-top-width: 0px;
              border-left-width: 2px;
            }
            .home-line5 {
              border-color: var(--dl-color-gray-900);
              border-style: dashed;
              border-top-width: 0px;
              border-left-width: 2px;
            }
            .home-container15 {
              width: 100%;
              align-items: flex-start;
              padding-top: var(--dl-space-space-twounits);
              flex-direction: column;
              padding-bottom: var(--dl-space-space-twounits);
              justify-content: space-between;
            }
            .home-text27 {
              margin-top: var(--dl-space-space-twounits);
              margin-left: 0px;
              margin-right: 0px;
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-heading2 {
              margin-top: var(--dl-space-space-twounits);
              margin-left: 0px;
              margin-right: 0px;
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-text30 {
              text-align: left;
            }
            .home-step3 {
              width: 100%;
              height: auto;
              flex-direction: row;
              justify-content: center;
            }
            .home-container16 {
              width: var(--dl-size-size-small);
              height: auto;
              align-self: stretch;
              padding-top: 0px;
              padding-left: 0px;
              padding-right: 0px;
              flex-direction: column;
              padding-bottom: 2px;
              justify-content: space-between;
            }
            .home-line6 {
              border-top-width: 0px;
              border-left-width: 2px;
            }
            .home-line7 {
              border-color: transparent;
              border-style: dashed;
              border-top-width: 0px;
              border-left-width: 2px;
            }
            .home-container18 {
              width: 100%;
              align-items: flex-start;
              padding-top: var(--dl-space-space-twounits);
              flex-direction: column;
              padding-bottom: var(--dl-space-space-twounits);
              justify-content: space-between;
            }
            .home-text33 {
              margin-top: var(--dl-space-space-twounits);
              margin-left: 0px;
              margin-right: 0px;
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-heading3 {
              margin-top: var(--dl-space-space-twounits);
              margin-left: 0px;
              margin-right: 0px;
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-text36 {
              text-align: left;
            }
            .home-personal-projects {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
            .home-text39 {
              text-align: center;
            }
            .home-container19 {
              flex-direction: column;
            }
          }
          @media (max-width: 479px) {
            .home-top-card {
              width: 100%;
              height: 700px;
              position: relative;
            }
            .home-image {
              flex: 1;
              width: auto;
              height: 400px;
              align-self: stretch;
              border-radius: 0px;
            }
            .home-container01 {
              width: 100%;
            }
            .home-text02 {
              margin-bottom: var(--dl-space-space-halfunit);
            }
            .home-container03 {
              width: 422px;
            }
            .home-container04 {
              width: 200px;
              height: 92px;
              margin-right: 0px;
              padding-left: 0px;
              padding-right: 0px;
            }
            .home-container05 {
              width: 50%;
              height: 92px;
              margin-right: 0px;
              padding-left: 0px;
              padding-right: 0px;
            }
            .home-button {
              border-radius: 60px;
              background-color: transparent;
            }
            .home-button1 {
              border-radius: 60px;
              background-color: transparent;
            }
            .home-steps {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: var(--dl-space-space-unit);
              padding-bottom: var(--dl-space-space-twounits);
            }
            .home-container06 {
              padding-left: 0px;
            }
            .home-container09 {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: 0px;
              padding-bottom: var(--dl-space-space-twounits);
            }
            .home-text14 {
              margin-left: 0px;
              margin-right: var(--dl-space-space-twounits);
            }
            .home-heading {
              margin-left: 0px;
              margin-right: var(--dl-space-space-twounits);
            }
            .home-container12 {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: 0px;
              padding-bottom: var(--dl-space-space-twounits);
            }
            .home-text20 {
              margin-left: 0px;
              margin-right: var(--dl-space-space-twounits);
            }
            .home-heading1 {
              margin-left: 0px;
              margin-right: var(--dl-space-space-twounits);
            }
            .home-text23 {
              margin-left: 0px;
              margin-right: var(--dl-space-space-twounits);
            }
            .home-container15 {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: 0px;
              padding-bottom: var(--dl-space-space-twounits);
            }
            .home-text27 {
              margin-left: 0px;
              margin-right: var(--dl-space-space-twounits);
            }
            .home-heading2 {
              margin-left: 0px;
              margin-right: var(--dl-space-space-twounits);
            }
            .home-container18 {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: 0px;
              padding-bottom: var(--dl-space-space-twounits);
            }
            .home-text33 {
              margin-left: 0px;
              margin-right: var(--dl-space-space-twounits);
            }
            .home-heading3 {
              margin-left: 0px;
              margin-right: var(--dl-space-space-twounits);
            }
            .home-personal-projects {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: var(--dl-space-space-unit);
              padding-bottom: var(--dl-space-space-twounits);
            }
            .home-container20 {
              grid-template-columns: 1fr;
            }
            .home-image1 {
              width: 250px;
              height: 250px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Home;
