import React from "react"
import { Link as ChakraLink, Flex } from "@chakra-ui/core"

export default function Link({ href }) {
  return (
    <ChakraLink
      color="white"
      mr={3}
      bg="#3880ff"
      width="100%"
      href={href}
      isExternal
      borderRadius="0.25rem"
      textDecor="none"
      fontFamily="Montserrat"
    >
      <Flex justifyContent="center" alignItems="center" w="100%" height="100%">
        Open Link
      </Flex>
    </ChakraLink>
  )
}
