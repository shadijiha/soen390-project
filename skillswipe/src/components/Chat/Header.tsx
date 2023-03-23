import { Avatar, AvatarBadge, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Header = ({user,status}) => {
  const router = useRouter();
  return (
    <Flex w="100%" padding={5}>
      <Avatar
        size="lg"
        name="Dan Abrahmov"
        src={user.profilePic?`data:image/jpeg;base64,${user.profilePic}` : process.env.NEXT_PUBLIC_DEFAULT_PICTURE}
        boxShadow={'lg'}
      >

        {status == "online" ? 
        <AvatarBadge boxSize="1.25em" bg="green.500" />
        :
        <AvatarBadge boxSize="1.25em" bg="red.500" />
        }
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold" cursor="pointer" onClick={()=>{router.push(`/profile/${user.id}`)}}>
          {`${user.firstName} ${user.lastName}`}
        </Text>
        <Text fontSize='xs'>{status}</Text>
      </Flex>
    </Flex>
  )
}

export default Header
