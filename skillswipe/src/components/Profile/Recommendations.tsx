import { useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import ProfileStyle from '../../styles/profilestyle'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'

const Recommendations = ({ rocommendations }: any) => {
  const { t } = useTranslation('common')

  return (
    rocommendations && (
      <>
        <style jsx>{ProfileStyle}</style>
        <div className="home-container">
          <div className="home-testimonial">
            <div className="home-container1">
              <h1
                style={{
                  fontWeight: 600,
                  fontSize: '2.5rem',
                }}
              >
                <span>{t('recommendations')}</span>
                <br></br>
                <span></span>
              </h1>
              <span className="home-text03"></span>
              <div className="home-container2">
                {/* first testimonial */}

                {rocommendations.map((element: any) => {
                  return (
                    <div
                      className="home-testimonial-card"
                      style={{
                        borderRadius: '50px',
                        background: useColorModeValue('#FFFFFF', '#171923'),
                        outline: useColorModeValue(
                          'solid 2px #00000032',
                          'solid 2px #F5F5F588'
                        ),
                      }}
                    >
                      <svg
                        viewBox="0 0 950.8571428571428 1024"
                        className="home-icon"
                        fill={useColorModeValue('gray', 'white')}
                      >
                        <path d="M438.857 182.857v402.286c0 161.143-131.429 292.571-292.571 292.571h-36.571c-20 0-36.571-16.571-36.571-36.571v-73.143c0-20 16.571-36.571 36.571-36.571h36.571c80.571 0 146.286-65.714 146.286-146.286v-18.286c0-30.286-24.571-54.857-54.857-54.857h-128c-60.571 0-109.714-49.143-109.714-109.714v-219.429c0-60.571 49.143-109.714 109.714-109.714h219.429c60.571 0 109.714 49.143 109.714 109.714zM950.857 182.857v402.286c0 161.143-131.429 292.571-292.571 292.571h-36.571c-20 0-36.571-16.571-36.571-36.571v-73.143c0-20 16.571-36.571 36.571-36.571h36.571c80.571 0 146.286-65.714 146.286-146.286v-18.286c0-30.286-24.571-54.857-54.857-54.857h-128c-60.571 0-109.714-49.143-109.714-109.714v-219.429c0-60.571 49.143-109.714 109.714-109.714h219.429c60.571 0 109.714 49.143 109.714 109.714z"></path>
                      </svg>
                      <div className="home-testimonial1">
                        <span className="home-text05">{element.message}</span>
                        <span className="home-text06">Jane Doe</span>
                        <span className="home-text07">{element.relationship}</span>
                        <img
                          alt="profile"
                          src="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHdvbWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNjI2NDUxOTgy&amp;ixlib=rb-1.2.1&amp;h=1200"
                          className="home-image"
                        />
                      </div>
                    </div>
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

export default Recommendations
