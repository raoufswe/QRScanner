import React from "react"
import { useClipboard, Button } from "@chakra-ui/core"

export default function Copy({ text, closeModal }) {
  const { onCopy, hasCopied } = useClipboard(text)

  return (
    <Button onClick={onCopy} width="100%" fontFamily="Montserrat" color="black">
      {hasCopied ? "Copied" : "Copy"}
    </Button>
  )
}
