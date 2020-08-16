import React from "react"
import { Flex, Text } from "@chakra-ui/core"
import Link from "./Link"
import Copy from "./Copy"
import isUrl from "is-url"

export default function Card({ text }) {
  const isValidURL = isUrl(text)
  return (
    <Flex
      bg="#1e262f"
      p="1rem"
      borderRadius="8px"
      flexDir="column"
      mx="0"
      my="0.8rem"
      w="100%"
    >
      <Text color="white" fontFamily="Montserrat">
        Result:
      </Text>
      <Text color="white" mt="0.3rem" fontFamily="Montserrat">
        {text}
      </Text>
      <Flex mt="1rem">
        {isValidURL && <Link href={text} />}
        <Copy text={text} />
      </Flex>
    </Flex>
  )
}
