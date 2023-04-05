import { SearchIcon } from '@chakra-ui/icons'
import {
  border,
  Box,
  Flex,
  List,
  ListIcon,
  ListItem,
  Select,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { SetStateAction, useState } from 'react'

const Search = () => {
  const [search, setSearch] = useState(false)
  const toggleSearch = () => setSearch(!search)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const formBackground = useColorModeValue('gray.100', 'gray.700')
  const { getButtonProps, onToggle, getDisclosureProps, isOpen } = useDisclosure()

  const router = useRouter()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    router.push(`/searchResultpage?q=${searchTerm}`)
  }

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchTerm(event.target.value)
  }

  const { t } = useTranslation('common')

  return (
    <>
      <Flex display={['none', 'none', 'flex', 'flex']} marginLeft="auto">
        <Stack>
          <Box
            display={['none', 'none', 'flex', 'flex']}
            ml={'auto'}
            mr={'auto'}
            w="100%"
            position="relative"
            // search
          >
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={t('search')}
                value={searchTerm}
                onChange={handleChange}
                list="browser"
                style={{
                  width: '350px',
                  height: '42px',
                  paddingLeft: '50px',
                  borderRadius: '100px',
                  border: 'none',
                  // black with 30 opacity
                  backgroundColor: useColorModeValue('#0000001A', '#FFFFFF1A'),
                }}
              />
              <SearchIcon
                position="absolute"
                top="50%"
                transform="translateY(-50%)"
                left="25px"
                zIndex={1}
                cursor="pointer"
                // change color when hover over
                _hover={{
                  color: 'blue.300',
                }}
                onClick={handleSubmit}
              />
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}

export default Search

function setSearchTerm(value: SetStateAction<string>) {
  throw new Error('Function not implemented.')
}
