import {
  Box,
  chakra,
  Container,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'

// const courseTitles = ['Shopify Course', 'React Course', 'Node Course']
// const courseDescriptions = [
//   'Shopify Course Description',
//   'React Course Description',
//   'Node Course Description',
// ]
// const courseYears = ['2015', '2016', '2017']

const Courses = ({ courses }: any) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const isDesktop = useBreakpointValue({ base: false, md: true })

  const { t } = useTranslation('common')
  return (
    <Container maxWidth="7xl" p={{ base: 2, sm: 10 }}>
      <chakra.h3 fontSize="4xl" fontWeight="bold" mb={18} textAlign="center">
        {t('accomplishedCourses')} 📚
        <br></br>
      </chakra.h3>
      {courses.map((milestone: any, index: any) => (
        <Flex key={index} mb="10px">
          {/* Desktop view(left card) */}
          {isDesktop && index % 2 === 0 && (
            <>
              <EmptyCard />
              <LineWithDot />
              <Card {...milestone} id={index} />
            </>
          )}

          {/* Mobile view */}
          {isMobile && (
            <>
              <LineWithDot />
              <Card {...milestone} id={index} />
            </>
          )}

          {/* Desktop view(right card) */}
          {isDesktop && index % 2 !== 0 && (
            <>
              <Card {...milestone} id={index} />

              <LineWithDot />
              <EmptyCard />
            </>
          )}
        </Flex>
      ))}
    </Container>
  )
}

const Card = (props: any) => {
  // For even id show card on left side
  // For odd id show card on right side

  const isEven = props.id % 2 === 0
  let borderWidthValue = isEven ? '15px 15px 15px 0' : '15px 0 15px 15px'
  let leftValue = isEven ? '-15px' : 'unset'
  let rightValue = isEven ? 'unset' : '-15px'

  const isMobile = useBreakpointValue({ base: true, md: false })
  if (isMobile) {
    leftValue = '-15px'
    rightValue = 'unset'
    borderWidthValue = '15px 15px 15px 0'
  }

  const [imgSrc, setImgSrc] = useState(
    'https://img.icons8.com/external-becris-flat-becris/512/external-math-literary-genres-becris-flat-becris.png'
  )

  const handleImageError = () => {
    setImgSrc(
      'https://img.icons8.com/external-becris-flat-becris/512/external-math-literary-genres-becris-flat-becris.png'
    )
    console.log('Error loading logo image')
  }

  const handleImageLoad = () => {
    console.log('Logo image loaded successfully')
  }

  return (
    <HStack
      flex={1}
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue('gray.100', 'gray.900')}
      spacing={5}
      rounded="lg"
      alignItems="center"
      pos="relative"
      _before={{
        content: `""`,
        w: '0',
        h: '0',
        borderColor: `transparent ${useColorModeValue(
          '#edf2f6',
          '#2D394E'
        )} transparent`,
        borderStyle: 'solid',
        borderWidth: borderWidthValue,
        position: 'absolute',
        left: leftValue,
        right: rightValue,
        display: 'block',
      }}
    >
      <Box>
        {/* stack items side by side */}
        <HStack spacing={0} textAlign="left">
          <image
            style={{
              marginRight: '8px',
            }}
          >
            <img
              src={imgSrc}
              width="20px"
              height="20px"
              alt="logo"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          </image>
          <Text fontSize="lg" color={isEven ? 'teal.400' : 'blue.300'}>
            {props.courseName}
          </Text>
        </HStack>

        <VStack spacing={2} mb={3} textAlign="left">
          <chakra.h1 fontSize="2xl" lineHeight={1.2} fontWeight="bold" w="100%">
            {props.courseNumber}
          </chakra.h1>
        </VStack>
      </Box>
    </HStack>
  )
}

const LineWithDot = () => {
  return (
    <Flex
      pos="relative"
      alignItems="center"
      mr={{ base: '40px', md: '40px' }}
      ml={{ base: '0', md: '40px' }}
    >
      <chakra.span
        position="absolute"
        left="50%"
        height="calc(100% + 10px)"
        border="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        top="0px"
      ></chakra.span>
      <Box pos="relative" p="10px">
        <Box
          pos="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
          width="100%"
          height="100%"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          bg={useColorModeValue('gray.600', 'gray.200')}
          borderRadius="100px"
          backgroundImage="none"
          opacity={1}
        ></Box>
      </Box>
    </Flex>
  )
}

const EmptyCard = () => {
  return (
    <Box flex={{ base: 0, md: 1 }} p={{ base: 0, md: 6 }} bg="transparent"></Box>
  )
}

//     courses && (
//       <div data-testid="courses">
//         <>
//           <style jsx>{ProfileStyle}</style>
//           <div>
//             <h1
//               style={{
//                 fontWeight: 600,
//                 fontSize: '1.5rem',
//                 paddingTop: '2rem',
//                 paddingBottom: '1rem',
//               }}
//             >
//               <span>Accomplished Courses</span>
//             </h1>
//           </div>
//           {/* map through each course and make a container for each course */}
//           <Grid templateColumns="repeat(3, 1fr)" gap={6}>
//             {/* map through each course and make a container for each course */}
//             {courses.map((courses: any) => (
//               <Container p={{ base: 5, md: 6 }}>
//                 <Stack
//                   w="17rem"
//                   spacing={2}
//                   p={4}
//                   border="1px solid"
//                   borderColor={useColorModeValue('gray.400', 'gray.600')}
//                   rounded="md"
//                   margin="0"
//                   _hover={{
//                     boxShadow: useColorModeValue(
//                       '0 4px 6px rgba(160, 174, 192, 0.6)',
//                       '0 4px 6px rgba(9, 17, 28, 0.4)'
//                     ),
//                   }}
//                 >
//                   <HStack justifyContent="space-between" alignItems="baseline">
//                     <Box pos="relative">
//                       <Avatar
//                         src="https://img.icons8.com/external-becris-flat-becris/512/external-math-literary-genres-becris-flat-becris.png"
//                         name="Course"
//                         size="xl"
//                         borderRadius="md"
//                       />
//                     </Box>
//                     <Icon as={FaPencilRuler} w={6} h={6} />
//                   </HStack>
//                   <chakra.h1 fontSize="xl" fontWeight="bold">
//                     {`${courses.courseName} ${courses.courseNumber}`}
//                   </chakra.h1>
//                 </Stack>
//               </Container>
//             ))}
//           </Grid>
//         </>
//       </div>
//     )
//   )
// }

export default Courses
