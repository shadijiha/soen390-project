import {
  addEducationHistoryRequest,
  deleteEducationHistoryRequest,
  editEducationHistoryRequest,
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

const EducationHistory = (props: any) => {
  const { t } = useTranslation('common')
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
    event.preventDefault()
    if (
      !educationHistory.degree ||
      !educationHistory.institution ||
      !educationHistory.start_year ||
      !educationHistory.end_year
    ) {
      toast(t('fillFields'))
      return
    }
    if (educationHistory.start_year > educationHistory.end_year) {
      toast(t('addValidYear'))
      return
    } else {
      addEducationHistoryRequest(educationHistory).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('updatedSuccessfully'))
        } else {
          toast.error(t('errorUpdating'))
        }
      })
    }
  }

  const deleteEducation = (event: any) => {
    event.preventDefault()
    if (props.isNew) {
      props.deleteEducation(props.education.id)
    } else {
      deleteEducationHistoryRequest(educationHistory.id).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('deletedSuccessfully'))
          console.log('Chilld:' + props.education.id)
          props.deleteEducation(props.education.id)
        } else {
          toast.error(t('errorDeleting'))
        }
      })
    }
  }
  const updateEducation = (event: any) => {
    event.preventDefault()
    // call API to update education history
    if (
      !educationHistory.degree ||
      !educationHistory.institution ||
      !educationHistory.start_year ||
      !educationHistory.end_year
    ) {
      toast(t('fillFields'))
      return
    }
    if (educationHistory.start_year > educationHistory.end_year) {
      toast(t('addValidYear'))
      return
    } else {
      editEducationHistoryRequest(educationHistory).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('updatedSuccessfully'))
        } else {
          toast.error(t('errorUpdating'))
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
          {t('education')} {props.index} {props.isNew}
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
            onClick={addEducation}
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
          onClick={deleteEducation}
        >
          <DeleteIcon />
        </Button>
      </Stack>
      <FormControl id="institution">
        <FormLabel htmlFor="institution">{t('institution')}</FormLabel>
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
        <FormLabel htmlFor="start_year-when">{t('startDate')}</FormLabel>
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
        <FormLabel htmlFor="end_year">{t('endDate')}</FormLabel>
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
        <FormLabel htmlFor="degree">{t('degree')}</FormLabel>
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
