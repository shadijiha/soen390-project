/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { useColorMode, useColorModeValue } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ProfileStyle from '../../styles/profilestyle'

const Education = ({ education }: any) => {
  const { t } = useTranslation('common')
  return (
    education && (
      <>
        <div data-testid="education">
          <style jsx>{ProfileStyle}</style>
          <div className="edu-container">
            <div className="edu-features">
              <h1
                className="edu-text"
                style={{
                  fontWeight: 600,
                  fontSize: '2.5rem',
                }}
              >
                <span>{t('educationHistory')}</span>
              </h1>
              <span className="edu-text03">
                <span></span>
              </span>

              <div className="edu-container1">
                {education.map((element: any) => {
                  return (
                    <>
                      <div className="edu-feature-card">
                        <img
                          // different picture URL if the colormode is dark
                          src={useColorModeValue(
                            'https://img.icons8.com/3d-fluency/512/student-male.png',
                            'https://img.icons8.com/3d-fluency/512/student-male.png'
                          )}
                          className="edu-icon"
                          width="50px"
                          height="50px"
                          alt="Concordia University"
                        />
                        <h2 className="edu-text06">{element.institution}</h2>
                        <span className="edu-text07">{element.degree}</span>
                        <span className="edu-text08">{`${element.start_year}-${element.end_year}`}</span>
                      </div>
                    </>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  )
}

export default Education
