import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import Alert from './alert'
import { formatDate } from './messages'

function ActionsModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { message, type } = props
  return (
    <>
      <Link onClick={onOpen}>View</Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Reported Message</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb="2">
              <Heading size="md" mb="2">
                Report Owner:{' '}
              </Heading>
              <Flex>
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar size="sm" src={message.reporter?.profilePic} />
                  <Box>
                    <Text size="sm">
                      {' '}
                      {message.reporter?.firstName +
                        ' ' +
                        message.reporter?.lastName}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>
            <Divider orientation="horizontal" />
            <Box mt="2">
              <Heading size="md" mb="2">
                Reported User:{' '}
              </Heading>
              <Flex>
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar size="sm" src={message.reportedProfilePic} />
                  <Box>
                    <Text size="sm">{message.reportedFullName}</Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>
            <Box mt="4">
              <Heading size="md" mb="2">
                Message:{' '}
              </Heading>
              <Text size="sm">{message.message.message}</Text>
            </Box>
            <Box mt="4">
              <Text size="sm">
                <Text fontSize="20px" fontWeight="bold" mb="2" display="inline">
                  Date:{' '}
                </Text>
                {formatDate(message.created_at)}
              </Text>
            </Box>
            {type === 'unresolved' && (
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
                  message="Are you sure you want ot mark this as safe?"
                  scheme="green"
                  action="Safe"
                />
              </Box>
            )}
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

export default ActionsModal
