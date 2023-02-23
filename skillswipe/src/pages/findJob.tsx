import Layout from '@/components/Layout'
import { Text } from '@chakra-ui/react'
import React from 'react'
import NavBar from '../components/NavBar'

const findJob = () => {
  return (
    <>
      <Layout>
        <NavBar></NavBar>
        <Text data-testid="find-jobs">Find Jobs</Text>
      </Layout>
    </>
  )
}

export default findJob
