import { Button, Flex } from '@chakra-ui/react'

// interface SkillsListingProps {
//   skills?: Array<{ title: string }>
// }
//Removed interface to pass type any
//TODO: shall fix this later to specific type

const SkillsListing = ({ skills }) => {
  const skillTitles = skills?.map((skill) => skill.title) ?? []

  return (
    <Flex
      align="center"
      justify="center"
      direction="row"
      flexWrap={'wrap'}
      mx={'180px'}
    >
      {skillTitles.map((skillTitle, index) => (
        <Button
          key={index}
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
          {skillTitle}
        </Button>
      ))}
    </Flex>
  )
}

export default SkillsListing
