import { Button, Stack } from '@chakra-ui/react'

import 'react-toastify/dist/ReactToastify.css'
import ProfileStyle from '../../styles/profilestyle'

import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


const Languages = ({ languages }: any) => {
  const { t } = useTranslation('common')

  return (
    languages && (
      <div data-testid="languages">
        <>
          <style jsx>{ProfileStyle}</style>
          <div>
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
                <text>
                  🌐
                  {t('languages')}
                </text>
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
              {languages.map((languages: any) => (
                <Button
                  key={languages.id}
                  className="skill"
                  style={{
                    backgroundColor: 'transparent',
                    borderWidth: '2px',
                    textShadow: '0px 0px 0px #000000CA',
                    fontWeight: 600,
                    marginRight: '1em',
                    borderRadius: '100px',
                    marginBottom: '1em',
                  }}
                >
                  {`${languages.languageName} - ${languages.proficiency}`}
                </Button>
              ))}
            </Stack>
          </div>
        </>
      </div>
    )
  )
}
export default Languages
