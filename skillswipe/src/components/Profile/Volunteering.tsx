/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { Stack } from '@chakra-ui/react'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import ProfileStyle from '../../styles/profilestyle'

import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'

const Volunteering = ({ volunteer }: any) => {
  const { t } = useTranslation('common')
  return (
    volunteer && (
      <div data-testid="volunteering">
        <>
          <style jsx>{ProfileStyle}</style>
          <div>
            <h1
              className="edu-text"
              style={{
                fontWeight: 600,
                fontSize: '2.5rem',
                paddingTop: '1rem',
              }}
            >
              <span> {t('volunteeringHistory')}</span>
            </h1>
          </div>
          <Stack
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* volunteer */}
            {/* first volunteer card */}

            {volunteer.map((element: any) => {
              return (
                <div>
                  <div className="edu-feature-card1">
                    <img
                      src="https://img.icons8.com/doodle/512/volunteering.png"
                      className="edu-icon"
                      width="50px"
                      height="50px"
                      alt="Harvard"
                    />
                    <h2 className="edu-text09">{element.company}</h2>
                    <span className="edu-text10">{element.title}</span>
                    <span className="edu-text11">{`${element.start_year}-${
                      element.end_year ? element.end_year : 'Present'
                    }`}</span>
                  </div>
                </div>
              )
            })}
          </Stack>
        </>
      </div>
    )
  )
}

export default Volunteering
