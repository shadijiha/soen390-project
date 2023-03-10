/* eslint-disable react/jsx-key */
import { Button, Flex } from '@chakra-ui/react'

interface SkillsListingProps {
  skills?: Array<string>
}

const SkillsListing = ({ skills, }: SkillsListingProps) => {
  const data = [{ 
    id: 1,
    text: `${skills}`, 
    title: 'skill' 
  },]
  
  // const testSkillsArray = [
  //   'React',
  //   'Redux',
  //   'TypeScript',
  //   'Next.js',
  //   'Chakra',
  //   'UI/UX',
  //   'Node.js',
  //   'Express',
  //   'PostgreSQL',
  //   'MongoDB',
  //   'AWS',
  //   'Docker',
  //   'Git',
  //   'Agile',
  //   'Scrum',
  //   'Kanban',
  // ]
  // const counter = 0
  return (
    <>
      <Flex
        align="center"
        justify="center"
        direction="row"
        flexWrap={'wrap'}
        mx={'180px'}
      >
        {data.map((job) => (
          <Button
            key={job.id} 
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
             {job.text}
          </Button>
        ))}
      </Flex>
    </>
  )
}

export default SkillsListing
