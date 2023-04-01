import {
  Container,
  HStack,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import * as React from 'react'
import { useEffect } from 'react'

interface ProjectCardProps {
  id: number
  title: string
  desc: string
  logo: string
  link: string
  technologies: string[]
}

const projectsList: ProjectCardProps[] = [
  {
    id: 1,
    title: 'Project1',
    logo: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80',
    link: 'https://www.test.com',
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    technologies: ['rails', 'react'],
  },
  {
    id: 2,
    title: 'Project2',
    link: 'https://www.test.com',
    logo: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80',
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.`,
    technologies: ['ruby', 'javascript'],
  },
]

const PersonalProjectsProfile = ({ Project }: any) => {
  useEffect(() =>{
    console.log(Project)
  },[])
  const textColor = useColorModeValue('gray.700', 'gray.100')
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    Project &&
    Project.length > 0 && (
      <>
        <div>
          <h1
            style={{
              fontWeight: 600,
              fontSize: "1.5rem",
              paddingTop: "2rem",
            }}
          >
            <span>Personal Projects</span>
          </h1>
        </div>
        <Container maxW="5xl" p={{ base: 5, md: 10 }}>
          <VStack spacing={4}>

            {Project.map((element) => (
              
            <HStack
              p={8}
              bg={useColorModeValue("#FFFFFF", "#171923")}
              rounded="35px"
              borderWidth="2px"
              borderColor={useColorModeValue(
                "solid 2px #00000032",
                "solid 2px #F5F5F588"
              )}
              w="100%"
              h="100%"
              textAlign="left"
              align="start"
              spacing={4}
              cursor="pointer"
              _hover={{ shadow: "xl" }}
            >
                <VStack align="start" justify="flex-start">
                  <VStack spacing={0} align="start">

                    
                    <HStack>

                      <Text
                        as={Link}
                        href={element.url}
                        fontWeight="bold"
                        fontSize="md"
                        noOfLines={1}
                        onClick={(e) => e.stopPropagation()}
                        isExternal
                      >
                        {element.name}
                      </Text>
                    </HStack>

                    <Text fontSize="sm" color={textColor} noOfLines={{ base: 2 }}>
                      {element.description}
                    </Text>

                    {isOpen && (
                      <Text fontSize="sm" color={textColor}>
                        {element.description}
                      </Text>
                    )}
                  </VStack>
                </VStack>
            </HStack>
            ))}
          </VStack>
        </Container>
      </>
    )
  );
};

export default PersonalProjectsProfile
