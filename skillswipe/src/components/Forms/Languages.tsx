import {
  addLanguagesRequest,
  deleteLanguagesRequest,
  editLanguagesRequest,
} from '@/pages/api/profile_api'
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
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Languages = (props: any) => {
  const { t } = useTranslation('common')
  const [language, setLanguage] = useState({
    languageName: '',
    proficiency: '',
    id: 0,
  })

  if (language.languageName == '') setLanguage(props.language)
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setLanguage((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const updateLanguages = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (!language.languageName || !language.proficiency) {
      toast(t('fillFields'))
      return
    } else {
      editLanguagesRequest(token, language).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('updatedSuccessfully'))
        } else {
          toast.error(t('errorUpdating'))
        }
      })
    }
  }

  const addLanguages = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (!language.languageName || !language.proficiency) {
      toast(t('fillFields'))
      return
    } else {
      addLanguagesRequest(token, language).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('addedSuccessfully'))
        } else {
          toast.error(t('errorAdding'))
        }
      })
    }
  }

  const deleteLanguages = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (props.isNew) {
      props.deleteLanguage(props.language.id)
    } else {
      deleteLanguagesRequest(token, language.id).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('deletedSuccessfully'))
          props.deleteLanguage(props.language.id)
        } else {
          toast.error(t('errorDeleting'))
        }
      })
    }
    const deleteItem = () => {
      props.deleteLanguage(props.language.id)
    }
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
            onClick={updateLanguages}
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
            onClick={addLanguages}
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
          onClick={deleteLanguages}
        >
          <DeleteIcon />
        </Button>
      </Stack>
      <FormControl id="languageName">
        <FormLabel htmlFor="languageName">languageName</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          name="languageName"
          id="languageName"
          defaultValue={props.language.languageName}
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
          <option value="beginner">{t('beginner')}</option>
          <option value="intermediate">{t('intermediate')}</option>
          <option value="advanced">{t('advanced')}</option>
          <option value="native_speaker">{t('native')}</option>
        </Select>
      </FormControl>
    </Box>
  )
}
export default Languages
