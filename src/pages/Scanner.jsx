import React from "react"
import { IonContent, IonPage } from "@ionic/react"
import "./Scanner.css"
import Header from "../components/Header"
import ScannerIcon from "../assets/scanner.icon"
import { BarcodeScanner } from "@ionic-native/barcode-scanner"
import Modal from "../components/Modal.jsx"
import { Text, useDisclosure, useToast } from "@chakra-ui/core"
import HistoryController from "../db/history.controller"

const Scanner = () => {
  const [encodedText, setEncodedText] = React.useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const handleScan = async () => {
    try {
      const data = await BarcodeScanner.scan()
      if (!data?.text) return
      setEncodedText(data.text)
      onOpen()
    } catch (e) {
      alert(e)
      toast({
        description: "Something went wrong, please try again later",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const addToHistory = React.useCallback(async () => {
    if (!encodedText) return
    try {
      await HistoryController.set({
        text: encodedText,
      })
    } catch (e) {
      alert(e)
      toast({
        description: "Something went wrong while saving the scan",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    }
  }, [encodedText, toast])

  React.useEffect(() => {
    addToHistory()
  }, [addToHistory, encodedText])

  return (
    <IonPage>
      <IonContent>
        <Header />
        <Modal
          text={encodedText}
          actions={{
            isOpen,
            onOpen,
            onClose,
          }}
        />
        <div className="scanner-wrapper" onClick={handleScan}>
          <ScannerIcon />
          <Text color="white" fontSize="18px" fontFamily="Montserrat">
            Press to scan the bar code
          </Text>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Scanner
