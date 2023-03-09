import {
  ChevronDownIcon,
  CloseIcon,
  HamburgerIcon,
  SearchIcon,
} from '@chakra-ui/icons'
import {
  Avatar,
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
import React, { useEffect, useState } from 'react'
import { RiArrowDropDownFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Search from './Search/Search'

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode()
  // const isDark = colorMode === "dark";
  const [display, changeDisplay] = useState('none')
  const toggleTheme = useColorModeValue('🌙', '💡')
  const formBackground = useColorModeValue('gray.100', 'gray.700')
  const [searchTerm, setSearchTerm] = useState('')
  const { onToggle, isOpen } = useDisclosure()

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

  const searchIcon = SearchIcon

  try {
    searchIcon[0].addEventListener('click', function () {
      setTimeout(function () {
        if (display === 'none') {
          changeDisplay('block')
        } else {
          changeDisplay('none')
        }
      }, 100)
    })
  } catch (e) {
    console.log(e)
  }

  const navColor = useColorModeValue(
    'rgba(255, 255, 255, 0.25)',
    'rgba(0, 0, 0, 0.25)'
  )

  const logout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt')
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
  const handleFilter = (value) => {
    // open the openJobs page
    if (value === 'option1') {
      router.push('/openJobs')
    }
    // open the myJobListings page
    if (value === 'option2') {
      router.push('/myJobListings')
    }
    // open the myJobApplications page
    if (value === 'option3') {
      router.push('/myJobApplications')
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
          <NextLink href={''}>
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
              <Button aria-label="Home" my={5} w="100%" variant="ghost">
                Home
              </Button>
            </NextLink>

            <NextLink href="/inbox" passHref>
              <Button variant="ghost" aria-label="Messages" my={5} w="100%">
                Messages
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
