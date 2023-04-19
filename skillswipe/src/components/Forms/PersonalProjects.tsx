import {
  addPersonalProjectsRequest,
  deletePersonalProjectsRequest,
  editPersonalProjectsRequest,
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
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const PersonalProjects = (props: any) => {
  const { t } = useTranslation('common')
  const [personalProject, setPersonalProject] = useState({
    name: '',
    description: '',
    url: '',
    start_year: '',
    end_year: '',
    id: 0,
  })

  if (personalProject.name == '') setPersonalProject(props.personalProjects)
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
      toast(t('fillFields'))
      return
    }
    if (personalProject.start_year > personalProject.end_year) {
      toast(t('addValidYear'))
      return
    } else {
      editPersonalProjectsRequest(token, personalProject).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('updatedSuccessfully'))
        } else {
          toast.error(t('errorUpdating'))
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
      toast(t('fillFields'))
      return
    }
    if (personalProject.start_year > personalProject.end_year) {
      toast(t('addValidYear'))
      return
    } else {
      addPersonalProjectsRequest(token, personalProject).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('addedSuccessfully'))
        } else {
          toast.error(t('errorAdding'))
        }
      })
    }
  }

  const deletePersonalProjects = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (props.isNew) {
      props.deleteProject(props.personalProject?.id)
    } else {
      deletePersonalProjectsRequest(token, personalProject?.id).then((res) => {
        if (res.status === 201 || res.status === 200) {
          toast.success(t('deletedSuccessfully'))
          props.deleteProject(props.personalProject.id)
        } else {
          toast.error(t('errorDeleting'))
        }
      })
    }
  }
  const deleteItem = () => {
    props.deleteProject(props.personalProject?.id)
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
          {t('personalProjects')} {props.index} {props.isNew}
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
            {t('update')}
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
            {t('add')}
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
          defaultValue={props.personalProjects.name}
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
          defaultValue={props.personalProjects.description}
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
          defaultValue={props.personalProjects.url}
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl id="start_year">
        <FormLabel htmlFor="start_year">{t('startDate')}</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          name="start_year"
          id="start_year"
          defaultValue={props.personalProjects.start_year}
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="end_year">
        <FormLabel htmlFor="end_year">{t('endDate')}</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          name="end_year"
          id="end_year"
          defaultValue={props.personalProjects.end_year}
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
