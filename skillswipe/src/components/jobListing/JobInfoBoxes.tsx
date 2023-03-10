import { Box, Container, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'

interface JobInfoBoxesProps {
  salary?: string
  jobType?: string
  startDate?: string
}

const JobInfoBoxes = ({ salary, jobType, startDate }: JobInfoBoxesProps) => {
  const data = [
    { id: 1, text: `${salary}`, title: 'Salary' },
    { id: 2, text: `${jobType}`, title: 'Job Type' },
    { id: 3, text: `${startDate}`, title: 'Start Date' },
  ]

  return (
    <>
      <Container maxW="5xl" paddingBottom={8}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5} mt={5} mb={2}>
          {data.map((job) => (
            <Box key={job.id} p={5} boxShadow="md" rounded="36px" borderWidth={2}>
              <Text fontWeight="bold" fontSize="x-large" textAlign={'center'}>
                ${job.text}/hr
              </Text>
              <Text textAlign={'center'}>{job.title}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}

export default JobInfoBoxes
