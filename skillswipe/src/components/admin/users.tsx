import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React from 'react'
export const ListOfUsers = () => {
  return (
    <div>
      <Heading size="lg" mb="4">
        List of Users
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Message</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                {' '}
                <Flex>
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      size="sm"
                      name="Segun Adebayo"
                      src="https://bit.ly/sage-adebayo"
                    />
                    <Box>
                      <Text size="sm">Segun Adebayo</Text>
                    </Box>
                  </Flex>
                </Flex>
              </Td>
              <Td>helloworld</Td>
              <Td>24, March 2022</Td>
              <Td>
                <Badge colorScheme="yellow">Pending</Badge>
              </Td>
              <Td color="blue.200">tempƒ</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ListOfUsers
