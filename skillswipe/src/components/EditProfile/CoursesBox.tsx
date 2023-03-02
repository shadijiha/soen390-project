import { AddIcon } from '@chakra-ui/icons'
import { Button, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import Courses from '../Forms/Courses'

type Course = {
  courseName?: string
  courseNumber?: string
  id?: number
}


const CoursesBox = () => {
  // Api calls
  const profile = useSelector((state) => state as any)
  const [coursesList, setCoursesList] = useState(
    profile.auth.courses as Course[]
    )
  const deleteCourse = (id: number) => {
    setCoursesList(
      coursesList.filter((course: any) => course.id !== id))
  }
  // const addCourse = () => {
  //   let course: Course = {}
  //     setCoursesList((oldArray) => [...oldArray, course])
  // }

  const addCourse = () => {
    let course: Course = {}
    setCoursesList((oldArray) => {
      if (Array.isArray(oldArray)) {
        return [...oldArray, course]
      } else {
        return [course]
      }
    })
  }
  
  const isNew = (course: Course) => {
    return !(
      course.courseName &&
      course.courseNumber
    )
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
          fontSize: '1.5rem',
          fontWeight: 'bold',
          alignSelf: 'flex-start',
        }}
      >
        Course
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
          onClick={addCourse}
        >
          <AddIcon />
        </Button>
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {coursesList &&
          coursesList.map((course: any, index: number) => (
            <div key={index}>
              <Courses
                index={index + 1}
                course={course}
                deleteCourse={deleteCourse}
                isNew={isNew(course)}
              />
            </div>
          ))}
      </div>
    </Stack>
  )
}
export default CoursesBox
