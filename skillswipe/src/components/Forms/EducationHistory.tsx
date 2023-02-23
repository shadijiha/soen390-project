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
import {
  addEducationHistoryRequest,
  deleteEducationHistoryRequest,
  editEducationHistoryRequest,
} from '@/pages/api/profile_api'
const EducationHistory = (props: any) => {
  const [educationHistory, setEducationHistory] = useState({
    institution: '',
    degree: '',
    start_year: '',
    end_year: '',
    id: 0,
  })

  if (educationHistory.institution == '') setEducationHistory(props.education)
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setEducationHistory((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const addEducation = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (
      !educationHistory.degree ||
      !educationHistory.institution ||
      !educationHistory.start_year ||
      !educationHistory.end_year
    ) {
      toast('Please fill all the fields')
      return
    }
    if (educationHistory.start_year > educationHistory.end_year) {
      toast('Please add Valid start and end year')
      return
    } else {
      addEducationHistoryRequest(token, educationHistory).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success('Education updated successfully')
        } else {
          toast.error('Error updaing education')
        }
      })
    }
  }

  const deleteEducation = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()

    deleteEducationHistoryRequest(token, educationHistory.id).then((res) => {
      if (res.status == 201 || res.status == 200) {
        toast.success('Education updated successfully')
        console.log('Chilld:' + props.education.id)
        props.deleteEducation(props.education.id)
      } else {
        toast.error('Error deleting education')
      }
    })
  }
  const updateEducation = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    // call API to update education history
    if (
      !educationHistory.degree ||
      !educationHistory.institution ||
      !educationHistory.start_year ||
      !educationHistory.end_year
    ) {
      toast('Please fill all the fields')
      return
    }
    if (educationHistory.start_year > educationHistory.end_year) {
      toast('Please add Valid start and end year')
      return
    } else {
      editEducationHistoryRequest(token, educationHistory).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success('Education updated successfully')
        } else {
          toast.error('Error updaing education')
        }
      })
    }
  }

  return (
    <Box minWidth={'60vw'} borderWidth="1px" borderRadius={25} p={8} width="auto">
      <Stack direction={'row'}>
        <p
          style={{
            textAlign: 'left',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          Education {props.index} {props.isNew}
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
            onClick={updateEducation}
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
            onClick={addEducation}
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
          onClick={deleteEducation}
        >
          <DeleteIcon />
        </Button>
      </Stack>
      <FormControl id="institution">
        <FormLabel htmlFor="institution">Institution</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          defaultValue={props.education.institution}
          name="institution"
          id="institution"
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
          defaultValue={props.education.start_year}
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
          defaultValue={props.education.end_year}
          name="end_year"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="degree">
        <FormLabel htmlFor="degree">Degree</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          defaultValue={props.education.degree}
          name="degree"
          id="degree"
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
export default EducationHistory
