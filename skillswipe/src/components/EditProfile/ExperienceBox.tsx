import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Box,
  Heading,
  Text,
  Textarea,
} from '@chakra-ui/react'
import Experience from '../Forms/Experience'
import { AddIcon, SmallAddIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { editExperience } from '@/pages/api/api'
import 'react-toastify/dist/ReactToastify.css'
import { emailValidator } from '@/Util/Validator'

type Experience = {
  company?: string
  title?: string
  start_year?: string
  end_year?: string
  id?: number
}

const ExperienceBox = () => {
  // Api calls
  const profile = useSelector((state) => state as any)
  const [experienceList, setExperienceList] = useState(
    profile.auth.workExperiences as Experience[]
  )
  const deleteExperience = (id: number) => {
    setExperienceList(
      experienceList.filter((experience: any) => experience.id !== id)
    )
  }
  const addExperience = () => {
    let exp: Experience = {}
    setExperienceList((oldArray) => [...(oldArray || []), exp])
  }
  const isNew = (experience: Experience) => {
    return !(
      experience.company &&
      experience.start_year &&
      experience.end_year &&
      experience.title
    )
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
        Work Experience
        <Button
          style={{
            boxShadow: '0 5px 17px 0px rgba(0, 100, 500, 0.3)',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            marginLeft: '15px',
            marginBottom: '5px',
          }}
          type="button"
          colorScheme={'teal'}
          borderRadius="100px"
          onClick={addExperience}
        >
          <AddIcon />
        </Button>
      </Text>
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {experienceList &&
          experienceList.map((experience: Experience, index: number) => (
            <div key={index}>
              <Experience
                experience={experience}
                deleteExperience={deleteExperience}
                isNew={isNew(experience)}
                index={index + 1}
              />
            </div>
          ))}
      </div>
    </Stack>
  )
}
export default ExperienceBox
