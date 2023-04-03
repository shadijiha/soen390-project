import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Flex, Heading, List, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { default as NextLink } from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { search } from './api/api'

export default function Search() {
  const { t } = useTranslation('common')
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
          toast(t('noResults'))
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
      <Heading
        textAlign={'center'}
        style={{
          paddingBottom: '1.5rem',
        }}
      >
        {t('total results')}: {searchResults.length}
      </Heading>
      <Flex flexDir="column" align="center">
        <Stack>
          <div>
            <List>
              {searchResults.map((user: any) => (
                <Stack>
                  <Box
                    borderWidth="1px"
                    borderColor={formBorder}
                    backgroundColor={postBackground}
                    padding="1rem"
                    marginBottom="1rem"
                    rounded="25px"
                    overflow="hidden"
                    width="100%"
                    maxW={300}
                    minW={300}
                    key={user.id}
                  >
                    <li key={user.id}>
                      <NextLink href={`profile/${user.id}`}>
                        <Heading
                          fontSize={20}
                          style={{
                            paddingBottom: '1rem',
                            paddingLeft: '5px',
                          }}
                        >
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
                          style={{
                            borderRadius: '15px',
                          }}
                          alt={`${user.firstName} ${user.lastName}`}
                        />
                      </NextLink>
                    </li>
                  </Box>
                </Stack>
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
