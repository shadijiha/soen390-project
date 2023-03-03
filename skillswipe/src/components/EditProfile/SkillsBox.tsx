import { AddIcon } from '@chakra-ui/icons'
import { Button, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import Skills from '../Forms/Skills'

type Skill = {
  title?: string
  id?: number
}

const SkillsBox = () => {
  // Api calls
  const profile = useSelector((state) => state as any)
  const [skillsList, setSkillsList] = useState(profile.auth.skills as Skill[])
  const deleteSkill = (id: number) => {
    console.log('delete skill', id)
    console.log('skillsList', skillsList)
    setSkillsList(skillsList.filter((skill: any) => skill.id !== id))
    console.log('skillsList', skillsList)
  }

  const addSkill = () => {
    let skill: Skill = {}
    setSkillsList((oldArray) => [...oldArray, skill])
  }
  const isNew = (skill: Skill) => {
    return !skill.title
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
          <div key={index}>
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
