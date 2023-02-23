import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import React, { useState } from 'react'

const Languages = (props: any) => {
  const [language, setLanguage] = useState({
    language: '',
    proficiency: '',
    id: null,
  })

  if (language.language == '') setLanguage(props.language)
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setLanguage((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleSubmit = (event: any) => {
    const token = localStorage.getItem('jwt')
    // call API to update education history
    // editCourses(token, language).then((response) => {
    //    console.log(response);
    //    toast("Updated Successfully");
    // })
    //    .catch((error) => {
    //       toast(error.message);
    //    });
    event.preventDefault()
    console.log(language) // this will print out the form values
    // You can now use the form values to update the user's education history
  }

  const deleteItem = () => {
    props.deleteLanguage(props.language.id)
  }
  return (
    <Box
      minWidth={'60vw'}
      borderWidth="1px"
      borderRadius={25}
      p={25}
      m={5}
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
          Languages {props.index} {props.isNew}
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
      <FormControl id="language">
        <FormLabel htmlFor="language">Language</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          name="language"
          id="language"
          defaultValue={props.language.language}
          borderRadius="10"
          size={'lg'}
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="proficiency">
        <FormLabel htmlFor="proficiency">Proficiency</FormLabel>
        <Select
          minWidth={'100%'}
          name="proficiency"
          id="proficiency"
          defaultValue={props.language.proficiency}
          borderRadius="10"
          size={'lg'}
          mb={5}
          width="auto"
          onChange={handleChange}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="native_speaker">Native Speaker</option>
        </Select>
      </FormControl>
    </Box>
  )
}
export default Languages
