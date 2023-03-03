import { Avatar, AvatarBadge, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
  return (
    <Flex w="100%" padding={5}>
      <Avatar
        size="lg"
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
        boxShadow={'lg'}
      >
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          Ferin Patel
        </Text>
        <Text color="green.500">Online</Text>
      </Flex>
    </Flex>
  )
}

export default Header
