import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
export const ReportedPosts = () => {
  return (
    <div>
      <Heading size="lg" mb="4">
        Pending Reported Posts
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Post</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                {' '}
                <Flex spacing="4">
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
              <Td color="blue.200">
                <MessagesModal />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Heading size="lg" mb="4" mt={8}>
        Resolved Reported Posts
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Post</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                {' '}
                <Flex spacing="4">
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
                <Badge colorScheme="green">Resolved</Badge>
              </Td>
              <Td color="blue.200">
                <MessagesModal />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}

function MessagesModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Link onClick={onOpen}>View</Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Reported Post</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb="2">
              <Heading size="md" mb="2">
                Report Owner:{' '}
              </Heading>
              <Flex spacing="4">
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
            </Box>
            <Divider orientation="horizontal" />
            <Box mt="2">
              <Heading size="md" mb="2">
                Reported User:{' '}
              </Heading>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar size="sm" name="Marc Eid" />
                  <Box>
                    <Text size="sm">Marc Eid</Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>
            <Box mt="4">
              <Heading size="md" mb="2">
                Post:{' '}
              </Heading>
              <Text size="sm">
                Hello World, i am warning you to sukalikafika. Please dont report me
                to admin, they will ban me if you do so{' '}
              </Text>
              <Image
                boxSize="100px"
                objectFit="cover"
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
              />
            </Box>
            <Box mt="4">
              <Text size="sm">
                <Text fontSize="20px" fontWeight="bold" mb="2" display="inline">
                  Date:{' '}
                </Text>
                24, March 2022
              </Text>
            </Box>
            <Box mt="4">
              <Heading size="md" mb="2">
                Actions:{' '}
              </Heading>
              <Alert
                title="Send Warning to User"
                message="Are you sure you want to send a warning to user?"
                scheme="yellow"
                action="Send Warning"
              />
              <Alert
                title="Send Warning to User"
                message="Are you sure you want to ban user?"
                scheme="red"
                action="Ban User"
              />
              <Alert
                title="Mark Message as Safe"
                message="Are you sure you want ot mark this message as safe?"
                scheme="green"
                action="Safe"
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function Alert(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const { title, message, action, scheme } = props

  return (
    <>
      <Button colorScheme={scheme} onClick={onOpen} mr={2}>
        {action}
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{message}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme={scheme} onClick={onClose} ml={3}>
                {action}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
