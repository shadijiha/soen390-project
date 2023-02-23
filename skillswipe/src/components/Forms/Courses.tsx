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
import { editCourses } from '@/pages/api/api'
const Courses = (props: any) => {
  const [course, setCourse] = useState({
    institution: '',
    start_year: '',
    end_year: '',
    description: '',
    id: null,
  })
  if (course.institution == '') setCourse(props.course)
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleSubmit = (event: any) => {
    const token = localStorage.getItem('jwt')
    // call API to update education history
    if (course.start_year > course.end_year) {
      toast('Please add Valid start and end year')
    } else {
      // editCourses(token, course).then((response) => {
      //     console.log(response);
      //     toast("Updated Successfully");
      //   })
      //   .catch((error) => {
      //     toast(error.message);
      //   });
    }
    event.preventDefault()
    console.log(course) // this will print out the form values
    // You can now use the form values to update the user's education history
  }

  const deleteItem = () => {
    props.deleteCourse(props.course.id)
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
          Courses and Certifications {props.index} {props.isNew}
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
      <FormControl id="institution">
        <FormLabel htmlFor="institution">Institution</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          defaultValue={props.course.institution}
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
        <FormLabel htmlFor="start_year">Start Year</FormLabel>
        <Input
          minWidth={'100%'}
          type="number"
          defaultValue={props.course.start_year}
          name="start_year"
          id="start_year"
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
          type="number"
          defaultValue={props.course.end_year}
          name="end_year"
          id="end_year"
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
          defaultValue={props.course.description}
          name="description"
          id="description"
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
export default Courses
