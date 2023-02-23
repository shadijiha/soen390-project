import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Box,
  Heading,
  Text,
  Textarea,
} from '@chakra-ui/react'
import Languages from '../Forms/Languages'
import { AddIcon, SmallAddIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { editLanguages } from '@/pages/api/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { emailValidator } from '@/Util/Validator'

type Language = {
  language?: string
  proficiency?: string
  id: number
}

const LanguagesBox = () => {
  const profile = useSelector((state) => state as any)
  const [languageList, setLanguageList] = useState(
    profile.auth.languages as Language[]
  )
  const deleteLanguage = (id: number) => {
    setLanguageList(languageList.filter((language: any) => language.id !== id))
  }
  const addLanguage = () => {
    let lang: Language = { id: 10 }
    setLanguageList((oldArray) => [...(oldArray || []), lang])
  }
  const isNew = (language: Language) => {
    return !(language.language && language.proficiency)
  }
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
        Languages
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
