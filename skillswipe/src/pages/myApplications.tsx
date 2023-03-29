import NavBar from '@/components/NavBar'
import { Container, List, ListItem, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getMyApplications } from './api/api'
interface Application {
  id: number
  name: string
  email: string
  phone: string
  job: {
    id: number
    jobTitle: string
    companyName: string
    location: string
    jobDescription: string
    salary: string
    jobType: string
    startDate: string
    coverLetter: boolean
    transcript: boolean
    created_at: string
    updated_at: string
  }
  created_at: string
  cv: null
  coverLetter: null
}
const MyApplications = () => {
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('jwt')

      try {
        // Call API function to get open jobs

        const response = await getMyApplications(token)

        // Update state with fetched data
        setApplications(response.data)
      } catch (error) {
        console.error(error)
        toast.error('Error getting jobs')
      }
    }

    fetchApplications()
  }, [])

  return (
    <>
      <NavBar />
      <Container maxW="xl" centerContent>
        <Text fontSize="2xl" fontWeight="bold" my={6}>
          My Job Applications
        </Text>

        <List spacing={3}>
          {applications.map((application) => (
            <ListItem key={application.id}>
              <Text fontWeight="bold">
                {application.job.jobTitle} @ {application.job.companyName}
              </Text>
              <Text>{application.job.jobDescription}</Text>
              <Text>Name: {application.name}</Text>
              <Text>Email: {application.email}</Text>
              <Text>Phone: {application.phone}</Text>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  )
}

export default MyApplications
