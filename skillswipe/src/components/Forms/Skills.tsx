import {
  addSkillsRequest,
  deleteSkillsRequest,
  editSkillsRequest,
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
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'

const Skills = (props: any) => {
  const { t } = useTranslation('common')
  const [skill, setSkill] = useState({
    title: '',
    id: 0,
  })

  if (skill.title == '') setSkill(props.skill)
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setSkill((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const updateSkills = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (!skill.title) {
      toast(t('fillFields'))
      return
    } else {
      editSkillsRequest(token, skill).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('updatedSuccessfully'))
        } else {
          toast.error(t('errorUpdating'))
        }
      })
    }
  }

  const addSkill = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (!skill.title) {
      toast(t('fillFields'))
      return
    } else {
      addSkillsRequest(token, skill).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('addedSuccessfully'))
        } else {
          toast.error(t('errorAdding'))
        }
      })
    }
  }

  const deleteSkill = (event: any) => {
    const token = localStorage.getItem('jwt')
    event.preventDefault()
    if (props.isNew) {
      props.deleteSkill(props.skill.id)
    } else {
      deleteSkillsRequest(token, skill.id).then((res) => {
        if (res.status == 201 || res.status == 200) {
          toast.success(t('deletedSuccessfully'))
          props.deleteSkill(props.skill.id)
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
      m={8}
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
          {t('skills')} {props.index} {props.isNew}
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
            onClick={updateSkills}
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
            onClick={addSkill}
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
          onClick={deleteSkill}
        >
          <DeleteIcon />
        </Button>
      </Stack>
      <FormControl id="skill">
        <FormLabel htmlFor="">{t('skills')}</FormLabel>
        <Input
          minWidth={'100%'}
          type="text"
          defaultValue={skill.title}
          name="title"
          id="title"
          borderRadius="10"
          size="lg"
          mb={5}
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  )
}
export default Skills
