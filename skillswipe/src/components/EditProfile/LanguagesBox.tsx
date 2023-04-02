import { AddIcon } from '@chakra-ui/icons'
import { Button, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import Languages from '../Forms/Languages'

type Language = {
  languageName?: string
  proficiency?: string
  id?: number
}

const LanguagesBox = () => {
  // Api calls
  const profile = useSelector((state) => state as any)
  const [languageList, setLanguageList] = useState(
    profile.auth.languages as Language[]
  )
  const deleteLanguage = (id: number) => {
    setLanguageList(languageList.filter((language: any) => language.id !== id))
  }
  const addLanguage = () => {
    let lang: Language = {}
    setLanguageList((oldArray) => [...(oldArray || []), lang])
  }
  const isNew = (language: Language) => {
    return !(language.languageName && language.proficiency)
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
        {t('languages')}
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
          onClick={addLanguage}
        >
          <AddIcon />
        </Button>
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {languageList &&
          languageList.map((language: Language, index: number) => (
            <div key={language.id}>
              <Languages
                language={language}
                index={index + 1}
                deleteLanguage={deleteLanguage}
                isNew={isNew(language)}
              />
            </div>
          ))}
      </div>
    </Stack>
  )
}
export default LanguagesBox
