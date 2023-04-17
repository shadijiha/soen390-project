import { Box, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const router = useRouter()

  if (loading) {
    return (
      <Box alignContent={'center'}>
        <Spinner />
      </Box>
    )
  }
  console.log(user)

  if (!user) {
    router.push('/login')
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
