import {
  addCoursesRequest,
  editCoursesRequest,
  deleteCoursesRequest,
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

const Courses = (props: any) => {
  const [course, setCourse] = useState({
    courseName: '',
    courseNumber: '',
    id: 0,
  })


  if (course.courseName == '') setCourse(props.course)
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const updateCourses = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (
      !course.courseName || 
      !course.courseNumber
      ) {
      toast('Please fill all the fields')
      return
    } else {
      editCoursesRequest(token, course).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success('Course updated successfully')
        } else {
          toast.error('Error updaing course')
        }
      })
    }
  }

  const addCourses = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (
      !course.courseName || 
      !course.courseNumber
      ) {
      toast('Please fill all the fields')
      return
    } else {
      addCoursesRequest(token, course).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success('Course added successfully')
        } else {
          toast.error('Error adding course')
        }
      })
    }
  }

  const deleteCourses = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (props.isNew) {
      props.deleteCourse(props.course.id)
    }else{
    deleteCoursesRequest(token, course.id).then((res) => {
      if (res.status == 201 || res.status == 200) {
        toast.success('Course deleted successfully')
        props.deleteCourse(props.course.id)
      } else {
        toast.error('Error deleting course')
      }
    })
  }
  }
  const deleteItem = () => {
    props.deleteCourse(props.course.id)
  }

  return (
    <Box minWidth={'60vw'} borderWidth="1px" borderRadius={25} p={8} width="auto" mt={30}>
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
            onClick={updateCourses}
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
            onClick={addCourses}
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
          onClick= {deleteCourses}
        >
          <DeleteIcon />
        </Button>
      </Stack>
      <FormControl id="courseName">
        <FormLabel htmlFor="courseName">courseName</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          defaultValue={props.course.courseName}
          name="courseName"
          id="courseName"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      
      <FormControl id="courseNumber">
        <FormLabel htmlFor="courseNumber">courseNumber</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          defaultValue={props.course.courseNumber}
          name="courseNumber"
          id="courseNumber"
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
