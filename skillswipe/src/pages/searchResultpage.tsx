import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Flex, Heading, List, ListItem, Stack } from '@chakra-ui/react'
import axios from 'axios'
import { default as Link, default as NextLink } from 'next/link'
import { useRouter } from 'next/router'
import { SetStateAction, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { search } from './api/api'

export default function Search() {
  const formBorder = useColorModeValue('gray.100', 'gray.600')
  const postBackground = useColorModeValue('gray.100', 'gray.700')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [profile, setProfile] = useState({
    image:
      'https://marketplace.canva.com/EAFKZzWYqqE/1/0/1600w/canva-purple-navy-neon-gradient-modern-minimalist-man-tiktok-profile-picture-kqzwo_88iLY.jpg',
    cover:
      'https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc',
  })

  const router = useRouter()

  const searchQuery = router.query.q?.valueOf() as string

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    search(token, searchQuery)
      .then((response) => {
        if (!response.data || !response.data.users) {
          toast('No results found')
        } else {
          if (response.data !== null && response.data.users !== null) {
            const searchedUsers = response.data.users.filter(
              (user: any) =>
                user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setSearchResults(searchedUsers)
            console.log(searchResults)
          } else {
            setSearchResults([])
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [searchQuery])

  // display search results in a card component with profile pic, name,

  return (
    <Layout>
      <NavBar></NavBar>
      <Heading padding={3}>Search Results: {searchResults.length}</Heading>
      <Flex flexDir="column" align="center">
        <Stack>
          <div>
            <List>
              {searchResults.map((user: any) => (
                <ListItem>
                  <Box
                    borderWidth="1px"
                    borderColor={formBorder}
                    backgroundColor={postBackground}
                    padding="1rem"
                    marginBottom="1rem"
                    rounded="20"
                    overflow="hidden"
                    width="100%"
                    maxW={350}
                    minW={350}
                    key={user.id}
                  >
                    <li key={user.id}>
                      <NextLink href={`/profile/${user.id}}`} passHref>
                        <Heading fontSize={30} padding={1}>
                          {user.firstName} {user.lastName}
                        </Heading>
                        <div
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '150px',
                            width: '150px',
                            position: 'absolute',
                            margin: '2%',
                            marginBottom: '1%',
                          }}
                        ></div>

                        <img
                          src={
                            user.profilePic
                              ? `data:image/jpeg;base64,${user.profilePic}`
                              : profile.image
                          }
                          alt={`${user.firstName} ${user.lastName}`}
                        />
                      </NextLink>
                    </li>
                  </Box>
                </ListItem>
              ))}
            </List>
          </div>
        </Stack>
      </Flex>
    </Layout>
  )
}

// const handleSearch = async (e:any) => {
// const token = localStorage.getItem("jwt");

// search(token, searchQuery)
//     .then((response) => {
//         console.log(response.data.users);
//         if (response.data == null) {
//             toast("No results found");
//         }else{

//           const fetch = response.data.users.json();
//           // using key value pairs

//           response.data.users.map((user:any) => {
//             setSearchResults({...searchResults, firstName: user.firstName, lastName: user.lastName, profilePic: user.profilePic});
//           })

//         }
//     })
//     .catch((error) => {

//         console.log(error);
//     })
// };
