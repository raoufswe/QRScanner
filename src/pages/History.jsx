import React from "react"
import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react"
import Card from "../components/Card"
import Header from "../components/Header"
import Nodata from "../assets/noData"
import ErrorUI from "../assets/error"
import { Text, Spinner, Flex, Input, Box } from "@chakra-ui/core"
import "./History.css"
import HistoryController from "../db/history.controller"
import Fuse from "fuse.js"
import {
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react"
import { trash } from "ionicons/icons"
import { IonIcon } from "@ionic/react"

const History = () => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [query, updateQuery] = React.useState("")

  const fuse = new Fuse(data, {
    threshold: 0.4,
    keys: ["text"],
  })

  const searchResults = query
    ? fuse.search(query).map((character) => character.item)
    : data

  const handleSubscription = async (data) => {
    try {
      setData(data?.map((item) => item.toJSON()))
    } catch (e) {
      console.error(e)
      alert(e)
      setError(true)
    }
  }

  React.useEffect(() => {
    HistoryController.subscribe(handleSubscription)
    setLoading(false)
  }, [])

  const doRefresh = ({ detail }) => {
    setTimeout(() => {
      detail.complete()
    }, 500)
  }

  console.log(data)
  return (
    <IonPage>
      <IonContent>
        <Header />
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {loading ? (
          <Flex h="80%" w="100%" justify="center" alignItems="center">
            <Spinner size="xl" color="white" />
          </Flex>
        ) : error ? (
          <Flex
            flexDir="column"
            justify="center"
            alignItems="center"
            margin="2rem"
            height="60%"
          >
            <ErrorUI />
            <Text
              fontSize="16px"
              color="white"
              mt="1rem"
              textAlign="center"
              fontFamily="Montserrat"
            >
              Something went wrong,
              <Text fontFamily="Montserrat">please try again later</Text>
            </Text>
          </Flex>
        ) : data?.length ? (
          <>
            <Box m="1rem" borderRadius="8px">
              <Input
                placeholder="Search..."
                type="text"
                value={query}
                onChange={({ currentTarget }) =>
                  updateQuery(currentTarget.value)
                }
              />
            </Box>
            <Text
              textAlign="right"
              mr="1rem"
              color="#888"
              onClick={HistoryController.deleteHistory}
            >
              Delete all
            </Text>

            {searchResults.reverse().map(({ text, id }) => (
              <IonItemSliding id="item100" key={id}>
                <IonItem lines="none">
                  <Card text={text} />
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption color="contrast">
                    <IonIcon
                      slot="icon-only"
                      icon={trash}
                      color="danger"
                      onClick={() => HistoryController.deleteById(id)}
                    />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </>
        ) : (
          <div className="svg-wrapper">
            <Nodata />
            <Text
              color="white"
              fontSize="18px"
              mt="2rem"
              textAlign="center"
              fontFamily="Montserrat"
            >
              No entries found
            </Text>
          </div>
        )}

        {!searchResults.length && data?.length && (
          <Text
            textAlign="center"
            color="white"
            fontSize="17px"
            mt="1.3rem"
            fontFamily="Montserrat"
          >
            could not find any result
          </Text>
        )}
      </IonContent>
    </IonPage>
  )
}

export default History
