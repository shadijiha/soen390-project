/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import { Button, Stack } from '@chakra-ui/react'
import React from 'react'

import 'react-toastify/dist/ReactToastify.css'
import ProfileStyle from '../../styles/profilestyle'

import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Skills = ({ skillsArray }: any) => {
  // call API to get education history
  const { t } = useTranslation('common')

  return (
    skillsArray && (
      <div>
        <>
          <style jsx>{ProfileStyle}</style>
          <div>
            <h1
              style={{
                fontWeight: 600,
                fontSize: '1.5rem',
                paddingTop: '2rem',
                paddingBottom: '2rem',
                textAlign: 'center',
              }}
            >
              <span>🚀 {t('skills')}</span>
            </h1>
          </div>
          <Stack
            spacing={0}
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignContent: 'center',
              paddingRight: '3rem',
              paddingLeft: '3rem',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            {/* map through the skillsArray and create a button for each */}

            {skillsArray.map((skill: any) => (
              <Button
                className="skill"
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: '2px',
                  textShadow: '0px 0px 40px #000000CA',
                  fontWeight: 600,
                  marginRight: '1em',
                  borderRadius: '100px',
                  marginBottom: '1em',
                }}
              >
                {`${skill.title}`}
              </Button>
            ))}
          </Stack>
        </>
      </div>
    )
  )
}

export default Skills
