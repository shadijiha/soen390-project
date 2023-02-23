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

import { AddIcon, SmallAddIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { editEducationHistory } from '@/pages/api/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { emailValidator } from '@/Util/Validator'
import ProfileStyle from '../../styles/profilestyle'

const Awards = ({ awards }: any) => {
  // call API to get education history

  return (
    awards && (
      <div data-testid="awards">
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
                <text>🏅 Awards</text>
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
              {awards.map((awards: any) => (
                <Button
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
                  {`${awards.title} - ${awards.description}`}
                </Button>
              ))}
            </Stack>
          </div>
        </>
      </div>
    )
  )
}
export default Awards
