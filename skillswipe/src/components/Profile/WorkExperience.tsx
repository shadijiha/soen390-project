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
import React from 'react'

const WorkExperience = ({ experience }: any) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const isDesktop = useBreakpointValue({ base: false, md: true })

  return (
    <Container maxWidth="7xl" p={{ base: 2, sm: 10 }}>
      <chakra.h3 fontSize="4xl" fontWeight="bold" mb={18} textAlign="center">
        Career Journey 👨🏼‍💻
        <br></br>
      </chakra.h3>
      {experience.map((milestone: any, index: any) => (
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

  const isEvenId = props.id % 2 == 0
  let borderWidthValue = isEvenId ? '15px 15px 15px 0' : '15px 0 15px 15px'
  let leftValue = isEvenId ? '-15px' : 'unset'
  let rightValue = isEvenId ? 'unset' : '-15px'

  const isMobile = useBreakpointValue({ base: true, md: false })
  if (isMobile) {
    leftValue = '-15px'
    rightValue = 'unset'
    borderWidthValue = '15px 15px 15px 0'
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
          <Text fontSize="lg" color={isEvenId ? 'teal.400' : 'blue.300'}>
            {props.company}
          </Text>
          <image
            style={{
              marginLeft: '5px',
            }}
          >
            <img
              src={'https://www.' + props.company + '.com/favicon.ico'}
              width="25px"
              height="25px"
              alt="logo"
            />
          </image>
        </HStack>

        <VStack spacing={2} mb={3} textAlign="left">
          <chakra.h1 fontSize="2xl" lineHeight={1.2} fontWeight="bold" w="100%">
            {props.title}
            <Text fontSize="md">{`${props.start_year}-${props.end_year}`}</Text>
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

export default WorkExperience
