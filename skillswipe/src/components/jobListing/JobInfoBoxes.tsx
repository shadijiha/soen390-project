import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'

interface JobInfoBoxesProps {
  salary?: string
  jobType?: string
  startDate?: string
  location?: string
}

const JobInfoBoxes = ({
  salary,
  jobType,
  startDate,
  location,
}: JobInfoBoxesProps) => {
  const data = [
    { id: 1, text: '$' + `${salary}` + '/hr', title: 'Salary' },
    {
      id: 2,
      text: `${jobType}`.charAt(0).toUpperCase() + `${jobType}`.slice(1),
      title: 'Job Type',
    },
    { id: 3, text: `${startDate}`.split('T')[0], title: 'Start Date' },
    { id: 4, text: `${location}`, title: 'Location' },
  ]

  return (
    <Container maxW="5xl" paddingBottom={8}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={5} mt={5} mb={2}>
        {data.map((job) => (
          <Box key={job.id} p={5} boxShadow="md" rounded="36px" borderWidth={2}>
            <Text fontWeight="bold" fontSize="x-large" textAlign={'center'}>
              {job.text}
            </Text>
            <Text textAlign={'center'}>{job.title}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default JobInfoBoxes
