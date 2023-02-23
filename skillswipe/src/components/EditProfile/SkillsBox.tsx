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
import Skills from '../Forms/Skills'
import { AddIcon, SmallAddIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { editSkills } from '@/pages/api/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { emailValidator } from '@/Util/Validator'

type Skill = {
  skill?: string
  description?: string
  id: number
}

const SkillsBox = () => {
  const profile = useSelector((state) => state as any)
  const [skillsList, setSkillsList] = useState(profile.auth.skills as Skill[])
  const deleteSkill = (id: number) => {
    setSkillsList(skillsList.filter((skill: any) => skill.id !== id))
  }
  const addSkill = () => {
    let skill: Skill = { id: 10 }
    setSkillsList((oldArray) => [...oldArray, skill])
  }
  const isNew = (skill: Skill) => {
    return !(skill.skill && skill.description)
  }
  return (
    <Stack
      as="form"
      p={5}
      mb={5}
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
        Skills
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
          onClick={addSkill}
        >
          <AddIcon />
        </Button>
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {skillsList.map((skill: any, index: number) => (
          <div key={skill.id}>
            <Skills
              skill={skill}
              index={index + 1}
              deleteSkill={deleteSkill}
              isNew={isNew(skill)}
            />
          </div>
        ))}
      </div>
    </Stack>
  )
}

export default SkillsBox
