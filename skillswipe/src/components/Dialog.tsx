import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'
import styles from '../styles/modal.module.css'

const Dialog = ({ isOpen, onOpen, onClose, Report }) => {
  //   const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay className={styles.blurred} />
      <ModalContent>
        <ModalHeader>Report</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>
            Skillswipe has a legal “backdoor” to identify and-or prevent illegal
            activities, such as harassment.
          </p>
        </ModalBody>
        <ModalBody>
          <p>To Report the Chat Please press the Report Button</p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={Report}>
            Report
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
export default Dialog
