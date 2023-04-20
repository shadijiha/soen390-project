import {
  addVolunteeringRequest,
  deleteVolunteeringRequest,
  editVolunteeringRequest,
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
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Volunteering = (props: any) => {
  const { t } = useTranslation('common')
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

  const updateVolunteering = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (
      !volunteering.company ||
      !volunteering.title ||
      !volunteering.start_year ||
      !volunteering.end_year
    ) {
      toast(t('fillFields'))
      return
    }
    if (volunteering.start_year > volunteering.end_year) {
      toast(t('addValidYear'))
      return
    } else {
      editVolunteeringRequest(token, volunteering).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('updatedSuccessfully'))
        } else {
          toast.error(t('errorUpdating'))
        }
      })
    }
  }

  const deleteVolunteering = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (props.isNew) {
      props.deleteVolunteering(props.volunteering.id)
    } else {
      deleteVolunteeringRequest(token, volunteering.id).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('deletedSuccessfully'))
          props.deleteVolunteering(props.volunteering.id)
        } else {
          toast.error(t('errorDeleting'))
        }
      })
    }
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
      toast(t('fillFields'))
      return
    }
    if (volunteering.start_year > volunteering.end_year) {
      toast(t('addValidYear'))
      return
    } else {
      addVolunteeringRequest(token, volunteering).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('addedSuccessfully'))
        } else {
          toast.error(t('errorAdding'))
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
          {t('volunteering')} {props.index} {props.isNew}
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
            onClick={addVolunteering}
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
          onClick={deleteVolunteering}
        >
          <DeleteIcon />
        </Button>
      </Stack>
      <FormControl id="company">
        <FormLabel htmlFor="company">{t('company')}</FormLabel>
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
        <FormLabel htmlFor="start_year-when">{t('startDate')}</FormLabel>
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
        <FormLabel htmlFor="end_year">{t('endDate')}</FormLabel>
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
        <FormLabel htmlFor="title">{t('title')}</FormLabel>
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
