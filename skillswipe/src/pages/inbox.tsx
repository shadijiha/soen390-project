import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { Text } from '@chakra-ui/react'

const inbox = () => {
  return (
    <>
      <Layout>
        <NavBar></NavBar>
        <Text>Messages</Text>
      </Layout>
    </>
  )
}

export default inbox
