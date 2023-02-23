import {
  addVolunteeringRequest,
  editVolunteeringRequest,
  deleteVolunteeringRequest,
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

const Volunteering = (props: any) => {
  const [volunteering, setVolunteering] = useState({
    company: '',
    title: '',
    start_year: '',
    end_year: '',
    id: 0,
  })
  if (volunteering.company == '') setVolunteering(props.volunteering)
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setVolunteering((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const addVolunteering = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (
      !volunteering.company ||
      !volunteering.title ||
      !volunteering.start_year ||
      !volunteering.end_year
    ) {
      toast('Please fill all the fields')
      return
    }
    if (volunteering.start_year > volunteering.end_year) {
      toast('Please add Valid start and end year')
      return
    } else {
      addVolunteeringRequest(token, volunteering).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success('Volunteering added successfully')
        } else {
          toast.error('Error updaing volunteering')
        }
      })
    }
  }

  const deleteVolunteering = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()

    deleteVolunteeringRequest(token, volunteering.id).then((res) => {
      if (res.status == 201 || res.status == 200) {
        toast.success('Volunteering deleted successfully')
        console.log('Child' + props.volunteering.id)
        props.deleteVolunteering(props.volunteering.id)
      } else {
        toast.error('Error deleting volunteering')
      }
    })
  }
  const updateVolunteering = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (
      !volunteering.company ||
      !volunteering.title ||
      !volunteering.start_year ||
      !volunteering.end_year
    ) {
      toast('Please fill all the fields')
      return
    }
    if (volunteering.start_year > volunteering.end_year) {
      toast('Please add Valid start and end year')
      return
    } else {
      editVolunteeringRequest(token, volunteering).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success('Volunteering updated successfully')
        } else {
          toast.error('Error updaing volunteering')
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
          Volunteering {props.index} {props.isNew}
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
            onClick={updateVolunteering}
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
            onClick={addVolunteering}
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
          onClick={deleteVolunteering}
        >
          <DeleteIcon />
        </Button>
      </Stack>
      <FormControl id="company">
        <FormLabel htmlFor="company">Company</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          defaultValue={props.volunteering.company}
          name="company"
          id="company"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="start_year">
        <FormLabel htmlFor="start_year-when">Start date</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          id="start_year"
          defaultValue={props.volunteering.start_year}
          name="start_year"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="end_year">
        <FormLabel htmlFor="end_year">End date</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          id="end_year"
          defaultValue={props.volunteering.end_year}
          name="end_year"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="title">
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          defaultValue={props.volunteering.title}
          name="title"
          id="title"
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
export default Volunteering
