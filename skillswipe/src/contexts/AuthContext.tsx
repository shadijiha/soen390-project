import router from 'next/router'
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { changeStatus, checkLogin } from '../pages/api/api'

export const AuthContext = createContext<AuthContextType>({
  user: null as unknown as User,
  loading: false,
  setUser: function (value: SetStateAction<User>): void {
    throw new Error('Function not implemented.')
  },
})

export type User = {
  courses: any
  projects: any
  languages: any
  volunteeringExperience: any
  educations: any
  workExperiences: any
  awards: any
  skills: []
  id: number
  firstName: string
  lastName: string
  email: string
  mobileNo: string
  gender: 'male' | 'female'
  profilePic: string
  coverPic: string
  cv: string | null
  coverLetter: string | null
  biography: string
  userStatus: 'online' | 'offline'
  type: 'jobseeker' | 'recruiter' | 'admin'
  created_at: Date
  updated_at: Date
  deleted_at: Date
}

export type AuthContextType = {
  user: User
  setUser: Dispatch<SetStateAction<User>>
  loading: boolean
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>(null as unknown as User)
  const [loading, setLoading] = useState(true)

  const handleBeforeUnload = () => {
    changeStatus('offline').catch((error) => {
      toast(error.message)
    })
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)

    checkLogin()
      .then((resp) => {
        setUser(resp.data)

        if (router.asPath == '/register' || router.asPath == '/') {
          router.push('/home')
        }
        changeStatus('online').catch((error) => {
          toast(error.message)
        })
      })
      .catch((error) => {
        console.log('auth error:', error)
        setUser(null as unknown as User)
        router.push('/')
      })
      .finally(() => setTimeout(() => setLoading(false), 100))

    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
