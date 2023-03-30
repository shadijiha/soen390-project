import { changeStatus, getPendingRequest } from '@/pages/api/api'
import { getAllConversation, getConversationById } from '@/pages/api/chat'
import {
  BellIcon,
  ChevronDownIcon,
  CloseIcon,
  HamburgerIcon,
  SearchIcon,
} from '@chakra-ui/icons'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import Pusher from 'pusher-js'
import React, { useEffect, useState } from 'react'
import { RiArrowDropDownFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Search from './Search/Search'

export default function NavBar(props :any) {
  const { colorMode, toggleColorMode } = useColorMode()
  // const isDark = colorMode === "dark";
  const [display, changeDisplay] = useState('none')
  const toggleTheme = useColorModeValue('🌙', '💡')
  const formBackground = useColorModeValue('gray.100', 'gray.700')
  const [searchTerm, setSearchTerm] = useState('')
  const { onToggle, isOpen } = useDisclosure()
  const [pendingConnections, setPendingConnections] = useState([
    { user: { id: '', firstName: '', lastName: '', profilePic: '', timestamp: '' } },
  ])
  const [messageNotification, setmessageNotification] = useState([])
  
  const MobilehandleChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setSearchTerm(e.target.value)
  }

  const router = useRouter()
  const MobilehandleSubmit = (e: any) => {
    e.preventDefault()
    router.push(`/searchResultpage?q=${searchTerm}`)
  }

  const navColor = useColorModeValue(
    'rgba(255, 255, 255, 0.25)',
    'rgba(0, 0, 0, 0.25)'
  )

  const logout = () => {
    const token = localStorage.getItem('jwt')
    if (token) {
      localStorage.removeItem('jwt')
      changeStatus('offline', token)
        .then((response) => {})
        .catch((error) => {
          toast(error.message)
        })
      toast('Successfully Logged Out')
    }
  }

  const [showDropdown1, setShowDropdown1] = useState(false)
  const [showDropdown2, setShowDropdown2] = useState(false)

  const [profile, setProfile] = useState({
    name: 'John Smith',
    title: 'Software Engineer',
    location: 'Montreal, QC, CA',
    school: 'Concordia University',
    experience: 'Five years of experience in full stack development',
    experience2: 'Three years of experience in mobile development',
    experience3: 'Two years of experience in data analysis',
    image:
      'https://marketplace.canva.com/EAFKZzWYqqE/1/0/1600w/canva-purple-navy-neon-gradient-modern-minimalist-man-tiktok-profile-picture-kqzwo_88iLY.jpg',
    cover:
      'https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc',
  })
  const [Pic, setPic] = useState({
    profilePic: '',
    coverPic: '',
  })
  const currentUser = useSelector((state) => state as any)
  useEffect(() => {
    setPic({
      coverPic: currentUser.auth.coverPic,
      profilePic: currentUser.auth.profilePic,
    })
  }, [currentUser])

  const getPendingConnections = () => {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwt')
      getPendingRequest(token)
        .then((res) => {
          setPendingConnections(res.data)
        })
        .catch((err) => {
          toast.error(err)
        })
    }
  }

  const getMessage = async () => {
    const token = localStorage.getItem('jwt')
    var notification: any = []
    if (token) {
      try {
        const allConvo = await getAllConversation(token)
        allConvo.data.map(async (element) => {
          const convo = await getConversationById(token, element.id)

          convo.data.map(async (el) => {
            // console.log(el)
            const created_at: Date = new Date(el.created_at)
            const currentDate: Date = new Date()
            const diffInMs: any = currentDate.getTime() - created_at.getTime()
            const diffInHrs: number = diffInMs / (1000 * 60 * 60)
            if (el.receiverId == currentUser.auth.id && diffInHrs < 24) {
              var notif: any = {
                id: element.id,
                firstName: element.firstName,
                lastName: element.lastName,
                created_at: el.created_at,
                profilePic: element.profilePic,
              }
              notification.push(notif)
              notification.sort((a, b) => {
                const cr1: any = new Date(a.created_at)
                const cr2: any = new Date(b.created_at)
                return cr2.getTime() - cr1.getTime()
              })
              setmessageNotification(notification)
            }
          })
        })
      } catch (error) {
        toast(error.message)
      }
    }
  }

  useEffect(() => {
    if (currentUser.auth) {
      getPendingConnections()
      getMessage()

      const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? 'null'
      const PUSHER_APP_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER ?? 'us2'
      const pusher = new Pusher(PUSHER_APP_KEY, {
        cluster: PUSHER_APP_CLUSTER,
      })
      var channel = pusher.subscribe(`user-${currentUser.auth.id}`)
      channel.bind('friend-request', function (data) {
        getPendingConnections();
      })

    }
  }, [currentUser])

  const handleFilter = (value) => {
    // open the openJobs page
    if (value === 'option1') {
      router.push('/openJobs')
    }
    // open the jobListing page
    if (value === 'option2') {
      router.push('/myListings')
    }
    // open the myJobApplications page
    if (value === 'option3') {
      router.push('/postJob')
    }
  }

  return (
    <Box as="nav" p={15} w="100%" pt={'0px'} data-testid="Nav-Bar">
      <Flex paddingBottom={'7em'}>
        {/* Desktop */}
        <Flex
          backdropFilter="auto"
          backdropBlur="xl"
          position="fixed"
          left="0px"
          align="center"
          w="100%"
          backgroundColor={navColor}
          boxShadow="0px 0px 20px rgba(0, 0, 0, 0.25)"
          pt={'0px'}
          paddingEnd={'2em'}
          paddingStart={'2em'}
          zIndex="99999"
        >
          <Text
            style={{ fontWeight: 'bold', fontSize: 25 }}
            ml={'15px'}
            onClick={() => {
              router.push('/')
            }}
          >
            🚀 SkillSwipe
          </Text>
          <NextLink href="#">
            <Button
              onClick={toggleColorMode}
              variant="ghost"
              aria-label="Toggle Theme"
              my={5}
              w="100%"
              _hover={{
                transform: 'scale(1.25)',
              }}
            >
              {toggleTheme}
            </Button>
          </NextLink>

          <Search />
          <Flex display={['none', 'none', 'flex', 'flex']} ml={'auto'}>
            <NextLink href="/home" passHref>
              <Button
                aria-label="Home"
                my={5}
                w="100%"
                variant="ghost"
                rounded={'full'}
              >
                Home
              </Button>
            </NextLink>

            <NextLink href="/inbox" passHref>
              <Button
                variant="ghost"
                aria-label="Messages"
                my={5}
                w="100%"
                rounded={'full'}
              >
                Messages
              </Button>
            </NextLink>

            <NextLink href="/notifications" passHref>
              <div style={{ position: 'relative' }}>
                <IconButton
                  aria-label="Notifications"
                  icon={<BellIcon />}
                  variant="ghost"
                  size="lg"
                  w="100%"
                  my={5}
                ></IconButton>
                <Badge
                  colorScheme="red"
                  borderRadius="full"
                  px="2"
                  position="absolute"
                  top="20px"
                  right="0"
                >
                  {(props.nbNotifications != null)? props.nbNotifications : pendingConnections.length + messageNotification.length}
                </Badge>
              </div>
            </NextLink>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<Icon as={RiArrowDropDownFill} w={8} h={8} />}
                variant="outline"
                padding={'1.0em'}
                rounded={'full'}
                marginTop={'1.3em'}
                marginLeft={'1em'}
                marginRight={'1em'}
              >
                Careers
              </MenuButton>
              <MenuList
                style={{
                  borderRadius: '20px',
                }}
              >
                <MenuItem
                  onClick={() => handleFilter('option1')}
                  backgroundColor="transparent"
                  style={{
                    borderRadius: '10px',
                  }}
                  _hover={{
                    transform: 'scale(1.03)',
                  }}
                >
                  Open Jobs
                </MenuItem>
                <MenuItem
                  onClick={() => handleFilter('option2')}
                  backgroundColor="transparent"
                  style={{
                    borderRadius: '10px',
                  }}
                  _hover={{
                    backgroundColor: 'transparent',
                    transform: 'scale(1.03)',
                  }}
                >
                  My Job Listings
                </MenuItem>
                <MenuItem
                  onClick={() => handleFilter('option3')}
                  backgroundColor="transparent"
                  style={{
                    borderRadius: '10px',
                  }}
                  _hover={{
                    backgroundColor: 'transparent',
                    transform: 'scale(1.03)',
                  }}
                >
                  Create a Job Listing
                </MenuItem>
              </MenuList>
            </Menu>
            <NextLink href="/profile" passHref>
              <Menu isLazy>
                <MenuButton
                  as={Button}
                  size="sm"
                  px={0}
                  py={0}
                  my={6}
                  marginRight={6}
                  marginLeft={3}
                  variant="ghost"
                  rounded="full"
                >
                  <Avatar
                    outline="2px solid #FFFFFF35"
                    size="sm"
                    src={
                      Pic.profilePic
                        ? `data:image/jpeg;base64,${Pic.profilePic}`
                        : profile.image
                    }
                  />
                </MenuButton>
              </Menu>
            </NextLink>

            <NextLink href="/" passHref>
              <Button
                variant="ghost"
                aria-label="Logout"
                my={5}
                w="100%"
                onClick={logout}
                border="2px solid #BD293F"
                borderRadius="100px"
                _hover={{
                  boxShadow: 'md',
                  transform: 'scale(1.05)',
                }}
              >
                Logout
              </Button>
            </NextLink>
          </Flex>

          {/* Mobile */}
          <IconButton
            aria-label="Open Menu"
            size="lg"
            mr={2}
            icon={<HamburgerIcon />}
            onClick={() => changeDisplay('flex')}
            display={['flex', 'flex', 'none', 'none']}
            ml={'auto'}
            variant={'ghost'}
          />
        </Flex>

        {/* Mobile Content */}
        <Flex
          w="100vw"
          display={display}
          bgColor={formBackground}
          zIndex={20}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
        >
          <Flex justify="flex-end">
            <IconButton
              mt={2}
              mr={2}
              aria-label="Open Menu"
              size="xl"
              icon={<CloseIcon />}
              onClick={() => changeDisplay('none')}
              backgroundColor="transparent"
            />
          </Flex>

          <Flex flexDir="column" align="center" paddingTop={'5em'}>
            <NextLink href="/home" passHref>
              <Button variant="ghost" aria-label="Home" my={5} w="100%">
                Home
              </Button>
            </NextLink>

            <NextLink href="/inbox" passHref>
              <Button variant="ghost" aria-label="Messages" my={5} w="100%">
                Messages
              </Button>
            </NextLink>

            <NextLink href="/profile" passHref>
              <Button variant="ghost" aria-label="My Account" my={5} w="100%">
                My Account
              </Button>
            </NextLink>

            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<Icon as={RiArrowDropDownFill} w={8} h={8} />}
                variant="outline"
                padding={'1.0em'}
                rounded={'full'}
                marginTop={'1.3em'}
                marginLeft={'1em'}
                marginRight={'1em'}
                marginBottom={'1.5em'}
              >
                Careers
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleFilter('option1')}>
                  Open Jobs
                </MenuItem>
                <MenuItem onClick={() => handleFilter('option2')}>
                  My Job Listings
                </MenuItem>
                <MenuItem onClick={() => handleFilter('option3')}>
                  Create a Job Listing
                </MenuItem>
              </MenuList>
            </Menu>

            {/* <MobileSearchBar/> */}
            <Button
              onClick={onToggle}
              variant="ghost"
              aria-label="Search"
              backgroundColor="transparent"
            >
              🔎
            </Button>
            <Collapse in={isOpen} animateOpacity>
              <InputGroup>
                <form onSubmit={MobilehandleSubmit}>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={MobilehandleChange}
                    style={{
                      width: '250px',
                      height: '40px',
                      paddingLeft: '10px',
                      borderRadius: '100px',

                      border: 'none',
                      outline: '1px  black',
                      backgroundColor: formBackground,
                    }}
                  />

                  <InputRightElement width={9}>
                    <SearchIcon
                      className="mobile-search-icon"
                      position="absolute"
                      top="50%"
                      transform="translateY(-50%)"
                      left="10px"
                      color="gray.500"
                      zIndex={1}
                      cursor="pointer"
                      // change color when hover over
                      _hover={{
                        color: 'blue.300',
                      }}
                      onClick={MobilehandleSubmit}
                    />
                  </InputRightElement>
                </form>
              </InputGroup>
            </Collapse>

            <NextLink href="/" passHref>
              <Button
                variant="ghost"
                aria-label="Sign In"
                my={5}
                w="100%"
                border="2px solid #D2173DAF"
                borderRadius="100px"
                _hover={{
                  boxShadow: 'md',
                  transform: 'scale(1.05)',
                }}
              >
                Sign In/Logout
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
