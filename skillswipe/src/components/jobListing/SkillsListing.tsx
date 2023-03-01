/* eslint-disable react/jsx-key */
import Skills from '@/components/Forms/Skills'
import { Button, Flex } from '@chakra-ui/react'

const skillsArray = [
  'React',
  'Node',
  'Express',
  'MongoDB',
  'Python',
  'Java',
  'C++',
  'NextJS',
  'ChakraUI',
]
const SkillsListing = () => {
  return (
    <>
      <Flex
        align="center"
        justify="center"
        direction="row"
        flexWrap={'wrap'}
        mx={'80px'}
      >
        {skillsArray.map((skill: any) => (
          <Button
            className="skill"
            style={{
              backgroundColor: 'transparent',
              borderWidth: '2px',
              textShadow: '0px 0px 30px #00000014',
              fontWeight: 400,
              marginRight: '1em',
              borderRadius: '100px',
              marginBottom: '1em',
            }}
          >
            {skill}
          </Button>
        ))}
      </Flex>
    </>
  )
}

export default SkillsListing
