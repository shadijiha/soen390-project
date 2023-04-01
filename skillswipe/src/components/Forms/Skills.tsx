import {
  addSkillsRequest,
  deleteSkillsRequest,
  editSkillsRequest,
} from '@/pages/api/profile_api'
import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Skills = (props: any) => {
  const [skill, setSkill] = useState({
    title: '',
    id: 0,
  })

  if (skill.title == '') setSkill(props.skill)
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setSkill((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const updateSkills = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (!skill.title) {
      toast('Please fill all the fields')
      return
    } else {
      editSkillsRequest(token, skill).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success('Skill updated successfully')
        } else {
          toast.error('Error updating skill')
        }
      })
    }
  }

  const addSkill = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (!skill.title) {
      toast('Please fill all the fields')
      return
    } else {
      addSkillsRequest(token, skill).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success('Skill added successfully')
        } else {
          toast.error('Error adding skill')
        }
      })
    }
  }

  const deleteSkill = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (props.isNew) {
      props.deleteSkill(props.skill.id)
    } else {
      deleteSkillsRequest(token, skill.id).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success('Skill deleted successfully')
          props.deleteSkill(props.skill.id)
        } else {
          toast.error('Error deleting skill')
        }
      })
    }
  }

  return (
    <Box
      minWidth={'60vw'}
      borderWidth="1px"
      borderRadius={25}
      p={8}
      m={8}
      width="auto"
    >
      <Stack direction={'row'}>
        <p
          style={{
            textAlign: 'left',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          Skill {props.index} {props.isNew}
        </p>
        <Spacer />
        {!props.isNew && (
          <Button
            style={{
              boxShadow: '0 5px 17px 0px rgba(0, 100, 500, 0.3)',
              border: '3px solid rgba(255, 255, 255, 0.3)',
            }}
            type="button"
            colorScheme={'blue'}
            borderRadius="100px"
            onClick={updateSkills}
          >
            Update
          </Button>
        )}
        {props.isNew && (
          <Button
            style={{
              boxShadow: '0 5px 17px 0px rgba(0, 100, 500, 0.3)',
              border: '3px solid rgba(255, 255, 255, 0.3)',
            }}
            type="button"
            colorScheme={'blue'}
            borderRadius="100px"
            onClick={addSkill}
          >
            Add
          </Button>
        )}
        <Button
          style={{
            boxShadow: '0 5px 17px 0px rgba(0, 100, 500, 0.3)',
            border: '3px solid rgba(255, 255, 255, 0.3)',
          }}
          type="button"
          colorScheme={'red'}
          borderRadius="100px"
          onClick={deleteSkill}
        >
          <DeleteIcon />
        </Button>
      </Stack>
      <FormControl id="skill">
        <FormLabel htmlFor="">Skills</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          defaultValue={skill.title}
          name="title"
          id="title"
          borderRadius="10"
          size="lg"
          mb={5}
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  )
}

export default Skills
