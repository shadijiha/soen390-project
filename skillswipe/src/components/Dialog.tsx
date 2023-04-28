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
import { useTranslation } from 'next-i18next'
import React from 'react'
import styles from '../styles/modal.module.css'

const Dialog = ({ isOpen, onOpen, onClose, Report }) => {
  const { t } = useTranslation('common')

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay className={styles.blurred} />
      <ModalContent>
        <ModalHeader>{t('Report')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>
            {t(
              'Skillswipe has a legal “backdoor” to identify and-or prevent illegal activities, such as harassment.'
            )}
          </p>
        </ModalBody>
        <ModalBody>
          <p>{t('To Report the Chat Please press the Report Button')}</p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {t('close')}
          </Button>
          <Button variant="ghost" onClick={Report}>
            {t('Report')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Dialog
