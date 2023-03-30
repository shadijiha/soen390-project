import { AddIcon } from '@chakra-ui/icons'
import { Button, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import EducationHistory from '../Forms/EducationHistory'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'

type Education = {
  institution?: string
  start_year?: string
  end_year?: string
  degree?: string
  id?: number
}

const EducationHistoryBox = () => {
  const profile = useSelector((state) => state as any)
  const [educationList, setEducationList] = useState(
    profile.auth.educations as Education[]
  )
  const deleteEducation = (id: number) => {
    console.log('delete education', id)
    console.log('educationList', educationList)
    setEducationList(educationList.filter((education: any) => education.id !== id))
    console.log('educationList', educationList)
  }

  const addEducation = () => {
    const educ: Education = {}
    setEducationList((oldArray) => [...oldArray, educ])
  }
  const isNew = (education: Education) => {
    return !(
      education.institution &&
      education.start_year &&
      education.end_year &&
      education.degree
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
        {t('educationHistory')}
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
          onClick={addEducation}
        >
          <AddIcon />
        </Button>
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {educationList &&
          educationList.map((education: any, index: number) => (
            <div
              key={index}
              style={{
                marginBottom: '1.5em',
              }}
            >
              <EducationHistory
                education={education}
                index={index + 1}
                deleteEducation={deleteEducation}
                isNew={isNew(education)}
              />
            </div>
          ))}
      </div>
    </Stack>
  )
}


export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
export default EducationHistoryBox
