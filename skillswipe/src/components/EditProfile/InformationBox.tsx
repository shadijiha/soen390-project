import { editPersonalInformation } from '@/pages/api/api'
import { emailValidator } from '@/Util/Validator'
import { Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Information from '../Forms/Information'

const InformationBox = () => {
  const user = useSelector((state) => state as any)
  const [UpdateUser, setUpdateUser] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    biography: '',
    gender: '',
  })
  const update = (updateUser: any) => {
    var User = Object.assign(UpdateUser, updateUser)
    setUpdateUser(User)
  }
  const handleSubmit = async () => {
    const token = localStorage.getItem('jwt')

    if (
      UpdateUser.firstName ||
      UpdateUser.lastName ||
      UpdateUser.gender ||
      UpdateUser.mobileNo ||
      UpdateUser.email ||
      UpdateUser.biography
    ) {
      if (UpdateUser.email && !emailValidator(UpdateUser.email)) {
        toast('Please add Valid email')
      } else {
        editPersonalInformation(token, UpdateUser)
          .then((response) => {
            console.log(response)
            toast('Updated Successfully')
          })
          .catch((error) => {
            toast(error.message)
          })
      }
    }
  }

  return (
    <Stack
      as="form"
      p={5}
      style={{
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        WebkitAlignContent: 'center',
        WebkitAlignItems: 'center',
        WebkitBoxAlign: 'center',
        WebkitFlexWrap: 'wrap',
        WebkitJustifyContent: 'center',
      }}
    >
      <Text
        style={{
          alignSelf: 'flex-start',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        Personal Information
      </Text>
      <Information update={update} handleSubmit={handleSubmit} />
    </Stack>
  )
}
export default InformationBox
