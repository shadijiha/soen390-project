import { AddIcon } from '@chakra-ui/icons'
import { Button, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import PersonalProjects from '../Forms/PersonalProjects'

type PersonalProject = {
  name?: string
  description?: string
  url?: string
  start_year?: string
  end_year?: string
  id?: number
}

const PersonalProjectsBox = () => {
  // Api calls
  const profile = useSelector((state) => state as any)
  const [personalProjectsList, setPersonalProjectsList] = useState(
    profile.auth.projects as PersonalProject[]
  )
  const deletePersonalProject = (id: number) => {
    setPersonalProjectsList(
      personalProjectsList.filter(
        (personalProject: any) => personalProject.id !== id
      )
    )
  }
  const addPersonalProject = () => {
    let personalProject: PersonalProject = {}
    setPersonalProjectsList((oldArray) => [...(oldArray || []), personalProject])
  }
  const isNew = (personalProject: PersonalProject) => {
    return !(
      personalProject.name &&
      personalProject.start_year &&
      personalProject.end_year &&
      personalProject.description &&
      personalProject.url
    )
  }

  const { t } = useTranslation('common')

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
          alignSelf: 'flex-start',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        {t('personalProjects')}
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
          onClick={addPersonalProject}
        >
          <AddIcon />
        </Button>
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {personalProjectsList &&
          personalProjectsList.map((personalProject: any, index: number) => (
            <div key={index}>
              <PersonalProjects
                index={index + 1}
                personalProjects={personalProject}
                deletePersonalProjects={deletePersonalProject}
                isNew={isNew(personalProject)}
              />
            </div>
          ))}
      </div>
    </Stack>
  )
}
export default PersonalProjectsBox
