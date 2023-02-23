import React, { useEffect, useRef, useState } from 'react'
// import Router, { useRouter } from "next/router";
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode()
  // const isDark = colorMode === "dark";
  const [display, changeDisplay] = useState('none')
  const toggleTheme = useColorModeValue('🌙', '💡')
  const formBackground = useColorModeValue('gray.100', 'gray.700')

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
          <Text style={{ fontWeight: 'bold', fontSize: 25 }} ml={'15px'}>
            🚀 SkillSwipe
          </Text>
          <Flex display={['none', 'none', 'flex', 'flex']} ml={'auto'}>
            <NextLink href="/home" passHref>
              <Button aria-label="Home" my={5} w="100%" variant="ghost">
                Home
              </Button>
            </NextLink>

            <NextLink href="/findJob" passHref>
              <Button variant="ghost" aria-label="Find Jobs" my={5} w="100%">
                Find Jobs
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

          <Flex flexDir="column" align="center">
            <NextLink href="/home" passHref>
              <Button variant="ghost" aria-label="Home" my={5} w="100%">
                Home
              </Button>
            </NextLink>

            <NextLink href="/findJob" passHref>
              <Button variant="ghost" aria-label="Find Jobs" my={5} w="100%">
                Find Jobs
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
            <Button
              size="lg"
              marginLeft={3}
              onClick={toggleColorMode}
              variant="ghost"
              _hover={{
                transform: 'scale(1.25)',
              }}
            >
              {toggleTheme}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
