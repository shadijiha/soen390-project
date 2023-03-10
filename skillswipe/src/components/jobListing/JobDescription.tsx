import { Flex, Text } from '@chakra-ui/react'

interface jobDescriptionProps {
  jobDescription?: string
}

const JobDescription = ({ jobDescription }: jobDescriptionProps) => {
  const data = [{ id: 1, text: `${jobDescription}`, title: 'Job Description' }]

  return (
    <>
      {data.map((job) => (
        <Flex key={job.id} align="left" direction="column">
          <Text
            mx={{ base: 25, sm: 3, md: 130 }}
            style={{
              fontWeight: 600,
              fontSize: '2rem',
              textShadow: '0px 0px 10px #00000010',
              paddingBottom: '0.5em',
            }}
          >
            {job.title}
          </Text>
          <Text
            fontSize="18px"
            textAlign="justify"
            fontFamily="roboto"
            paddingBottom={1}
            mx={{ base: 25, sm: 3, md: 130 }}
          >
            {job.text}
          </Text>
        </Flex>
      ))}
    </>
  )
}

export default JobDescription
