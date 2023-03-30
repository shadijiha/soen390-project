import { AddIcon } from '@chakra-ui/icons'
import { Button, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import Awards from '../Forms/Awards'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'

type Awards = {
  title?: string
  issuer?: string
  url?: string
  issue_date?: string
  description?: string
}

const AwardsBox = () => {
  const profile = useSelector((state) => state as any)
  const [awardsList, setAwardsList] = useState(profile.auth.awards as Awards[])
  const deleteAward = (id: number) => {
    console.log('delete award', id)
    console.log('awardsList', awardsList)
    setAwardsList(awardsList.filter((award: any) => award.id !== id))
    console.log('awardsList', awardsList)
  }
  const addAward = () => {
    let award: Awards = {}
    setAwardsList((oldArray) => [...(oldArray || []), award])
  }
  const isNew = (award: Awards) => {
    return !(
      award.title &&
      award.description &&
      award.issue_date &&
      award.issuer &&
      award.url
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
          fontSize: '1.5rem',
          fontWeight: 'bold',
          alignSelf: 'flex-start',
        }}
      >
        {t('awards')}
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
          onClick={addAward}
        >
          <AddIcon />
        </Button>
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {awardsList &&
          awardsList.map((award: any, index: number) => (
            <div key={index}>
              <Awards
                index={index + 1}
                award={award}
                deleteAward={deleteAward}
                isNew={isNew(award)}
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

export default AwardsBox
