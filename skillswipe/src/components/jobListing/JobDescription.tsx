import { Flex, Text } from '@chakra-ui/react'

const JobDescription = () => {
  return (
    <>
      <Flex align="left" direction="column">
        <Text
          mx={{ base: 25, sm: 3, md: 130 }}
          style={{
            fontWeight: 600,
            fontSize: '2rem',
            textShadow: '0px 0px 10px #00000010',
            paddingBottom: '0.5em',
          }}
        >
          Description
        </Text>
        <Text
          fontSize="18px"
          textAlign="justify"
          fontFamily="roboto"
          paddingBottom={1}
          mx={{ base: 25, sm: 3, md: 130 }}
        >
          As a Google Software Engineer Intern, youll work on our core products and
          services, gaining real-world experience and working on projects that impact
          millions of users. Youll have the opportunity to collaborate with
          experienced engineers and designers, contribute to open-source projects,
          and develop new features that will be used by people all around the world.
        </Text>
      </Flex>
    </>
  )
}

export default JobDescription
