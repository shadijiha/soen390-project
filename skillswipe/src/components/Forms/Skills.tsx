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
  Spacer,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { toast } from 'react-toastify'
import { editSkills } from '@/pages/api/api'
import { useSelector } from 'react-redux'
const Skill = (props: any) => {
  const [skill, setSkill] = useState({
    skill: '',
    description: '',
    id: null,
  })
  if (skill.skill == '') setSkill(props.skill)
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setSkill((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleSubmit = (event: any) => {
    const token = localStorage.getItem('jwt')
    // call API to update education history
    // editSkills(token, skill).then((response) => {
    //     console.log(response);
    //     toast("Updated Successfully");
    //   })
    //   .catch((error) => {
    //     toast(error.message);
    //   });
    event.preventDefault()
    console.log(skill) // this will print out the form values
    // You can now use the form values to update the user's education history
  }

  const deleteItem = () => {
    props.deleteSkill(props.skill.id)
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
          Skills {props.index} {props.isNew}
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
            onClick={handleSubmit}
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
            onClick={handleSubmit}
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
          onClick={deleteItem}
        >
          <DeleteIcon />
        </Button>
      </Stack>
      <FormControl id="skill">
        <FormLabel htmlFor="">Skill</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          defaultValue={props.skill.skill}
          name="skill"
          id="skill"
          borderRadius="10"
          size="lg"
          mb={5}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="description">
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          id="description"
          name="description"
          defaultValue={props.skill.description}
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  )
}

export default Skill
