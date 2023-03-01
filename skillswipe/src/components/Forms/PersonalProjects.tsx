import {
  editPersonalProjectsRequest,
  addPersonalProjectsRequest,
  deletePersonalProjectsRequest,
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

const PersonalProjects = (props: any) => {
  const [personalProject, setPersonalProject] = useState({
    name: '',
    description: '',
    url: '',
    start_year: '',
    end_year: '',
    id: 0,
  })

  if (personalProject.name == '') setPersonalProject(props.personalProject)
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setPersonalProject((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const updatePersonalProjects = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (
      !personalProject.start_year ||
      !personalProject.end_year ||
      !personalProject.name ||
      !personalProject.description ||
      !personalProject.url
    ) {
      toast('Please fill all the fields')
      return
    }
    if (personalProject.start_year > personalProject.end_year) {
      toast('Please add Valid start and end year')
      return
    } else {
      editPersonalProjectsRequest(token, personalProject).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success('Personal Project updated successfully')
        } else {
          toast.error('Error updating Personal Project')
        }
      })
    }
  }

  const addPersonalProjects = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (
      !personalProject.start_year ||
      !personalProject.end_year ||
      !personalProject.name ||
      !personalProject.description ||
      !personalProject.url
    ) {
      toast('Please fill all the fields')
      return
    }
    if (personalProject.start_year > personalProject.end_year) {
      toast('Please add Valid start and end year')
      return
    } else {
      addPersonalProjectsRequest(token, personalProject).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success('Personal Project added successfully')
        } else {
          toast.error('Error adding Personal Project')
        }
      })
    }
  }

  const deletePersonalProjects = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    deletePersonalProjectsRequest(token, personalProject.id).then((res) => {
      if (res.status == 201 || res.status == 200) {
        toast.success('Personal Project deleted successfully')
      } else {
        toast.error('Error deleting Personal Project')
      }
    })
  }
  const deletePersonalProject = () => {
    props.deleteProject(props.personalProjects.id)
    
  }

  return (
    <Box
      minWidth={'60vw'}
      borderWidth="1px"
      borderRadius={25}
      p={8}
      mb={8}
      boxShadow="lg"
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
          Personal Project {props.index} {props.isNew}
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
            onClick={updatePersonalProjects}
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
            onClick={addPersonalProjects}
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
          onClick={deletePersonalProjects}
        >
          <DeleteIcon />
        </Button>
      </Stack>
      <FormControl id="name">
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          defaultValue={props.personalProject?.name || ''}
          name="name"
          id="name"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="description">
        <FormLabel htmlFor="description">Description</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          name="description"
          id="description"
          defaultValue={props.personalProject?.description || ''}
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="url">
        <FormLabel htmlFor="url">URL</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          name="url"
          id="url"
          defaultValue={props.personalProject?.url || ''}
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      
      <FormControl id="start_year">
        <FormLabel htmlFor="start_year">Start Year</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          name="start_year"
          id="start_year"
          defaultValue={props.personalProject?.start_year || ''}
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="end_year">
        <FormLabel htmlFor="end_year">End Year</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          name="end_year"
          id="end_year"
          defaultValue={props.personalProject?.end_year || ''}
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
export default PersonalProjects
