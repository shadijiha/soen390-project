import { AddIcon } from '@chakra-ui/icons'
import { Button, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import Volunteering from '../Forms/Volunteering'

type Volunteering = {
  company?: string
  title?: string
  start_year?: string
  end_year?: string
  id?: number
}

const VolunteeringBox = () => {
  const profile = useSelector((state) => state as any)
  const [volunteeringList, setVolunteeringList] = useState(
    profile.auth.volunteeringExperience as Volunteering[]
  )
  const deleteVolunteering = (id: number) => {
    setVolunteeringList(
      volunteeringList.filter((volunteering: any) => volunteering.id !== id)
    )
  }
  const addVolunteering = () => {
    const vol: Volunteering = {}
    setVolunteeringList((oldArray) => [...(oldArray || []), vol])
  }
  const isNew = (volunteering: Volunteering) => {
    return !(
      volunteering.company &&
      volunteering.start_year &&
      volunteering.end_year &&
      volunteering.title
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
        {t('volunteering')}
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
          onClick={addVolunteering}
        >
          <AddIcon />
        </Button>
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {volunteeringList &&
          volunteeringList.map(
            (volunteering: any, index: number) => (
              console.log('volunteering', volunteering),
              (
                <div key={index}>
                  <Volunteering
                    volunteering={volunteering}
                    index={index + 1}
                    deleteVolunteering={deleteVolunteering}
                    isNew={isNew(volunteering)}
                  />
                </div>
              )
            )
          )}
      </div>
    </Stack>
  )
}
export default VolunteeringBox
