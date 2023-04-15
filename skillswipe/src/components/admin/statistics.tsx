import {
  Box,
  Flex,
  Link,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { AiOutlineMessage } from 'react-icons/ai'
import { BsFillFileEarmarkPostFill, BsPerson } from 'react-icons/bs'

interface StatsCardProps {
  title: string
  stat: string
  icon: ReactNode
  link: string
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon, link } = props
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      backgroundColor={useColorModeValue('gray.100', 'gray.700')}
      borderColor={useColorModeValue('gray.200', 'gray.600')}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}
        >
          {icon}
        </Box>
      </Flex>
      <Link pl="16px" color="blue.400">
        {link}
      </Link>
    </Stat>
  )
}

export default function BasicStatistics() {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
        Statistics
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'Total Users'}
          stat={'5,000'}
          icon={<BsPerson size={'3em'} />}
          link={'View Users'}
        />
        <StatsCard
          title={'Reported Messages'}
          stat={'1,000'}
          icon={<AiOutlineMessage size={'3em'} />}
          link={'View Reported Messages'}
        />
        <StatsCard
          title={'Reported Posts'}
          stat={'7'}
          icon={<BsFillFileEarmarkPostFill size={'3em'} />}
          link={'View Reported Posts'}
        />
      </SimpleGrid>
    </Box>
  )
}
