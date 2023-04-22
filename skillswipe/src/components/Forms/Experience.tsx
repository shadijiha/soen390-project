import {
  addWorkExperienceRequest,
  deleteWorkExperienceRequest,
  editWorkEperienceRequest,
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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Experience = (props: any) => {
  const { t } = useTranslation('common')
  const [experience, setExperience] = useState({
    company: '',
    title: '',
    start_year: '',
    end_year: '',
    id: 0,
  })

  if (experience.company == '') setExperience(props.experience)
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setExperience((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const updateWorkExperience = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (
      !experience.start_year ||
      !experience.end_year ||
      !experience.company ||
      !experience.title
    ) {
      toast(t('fillFields'))
      return
    }
    if (experience.start_year > experience.end_year) {
      toast(t('addValidYear'))
      return
    } else {
      editWorkEperienceRequest(token, experience).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('updatedSuccessfully'))
        } else {
          toast.error(t('errorUpdating'))
        }
      })
    }
  }

  const addWorkExperience = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (
      !experience.start_year ||
      !experience.end_year ||
      !experience.company ||
      !experience.title
    ) {
      toast(t('fillFields'))
      return
    }
    if (experience.start_year > experience.end_year) {
      toast(t('addValidYear'))
      return
    } else {
      addWorkExperienceRequest(token, experience).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('addedSuccessfully'))
        } else {
          toast.error(t('errorAdding'))
        }
      })
    }
  }

  const deleteWorkExperience = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (props.isNew) {
      props.deleteExperience(props.experience.id)
    } else {
      deleteWorkExperienceRequest(token, experience.id).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('deletedSuccessfully'))
          props.deleteExperience(props.experience.id)
        } else {
          toast.error(t('errorDeleting'))
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
      width="auto"
      mt={30}
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
          {t('experience')} {props.index} {props.isNew}
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
            onClick={updateWorkExperience}
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
            onClick={addWorkExperience}
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
          onClick={deleteWorkExperience}
        >
          <DeleteIcon />
        </Button>
      </Stack>
      <FormControl id="company">
        <FormLabel htmlFor="company">{t('company')}</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          defaultValue={props.experience.company}
          id="company"
          name="company"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="title">
        <FormLabel htmlFor="title">{t('title')}</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          defaultValue={props.experience.title}
          id="title"
          name="title"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="start_year">
        <FormLabel htmlFor="start_year-when">{t('startDate')}</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          id="start_year"
          defaultValue={props.experience.start_year}
          name="start_year"
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
          id="end_year"
          defaultValue={props.experience.end_year}
          name="end_year"
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
export default Experience
