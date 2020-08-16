import React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SlideIn,
  Text,
} from "@chakra-ui/core"
import Link from "../components/Link"
import Copy from "../components/Copy"

export default function ModalCo({ actions, text }) {
  return (
    <>
      <SlideIn in={actions.isOpen}>
        {(styles) => (
          <Modal isOpen={actions.isOpen} onClose={actions.onClose} isCentered>
            <ModalOverlay />
            <ModalContent margin="1.5rem" borderRadius="8px">
              <ModalCloseButton />
              <ModalBody pt="2rem">
                <Text fontWeight="500" fontFamily="Montserrat">
                  Results:
                </Text>
                <Text fontFamily="Montserrat" pt="0.7rem">
                  {text}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Link href={text}>Open Link</Link>
                <Copy text={text} closeModal={actions.onClose} />
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </SlideIn>
    </>
  )
}
