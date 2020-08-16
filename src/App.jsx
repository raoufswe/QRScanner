import React from "react"
import { Redirect, Route } from "react-router-dom"
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react"
import { ThemeProvider, CSSReset } from "@chakra-ui/core"
import { IonReactRouter } from "@ionic/react-router"
import { scanOutline, folderOpenOutline } from "ionicons/icons"
import Scanner from "./pages/Scanner"
import History from "./pages/History"
import "@babel/polyfill"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

/* Theme variables */
import "./theme/variables.css"

const App = () => (
  <ThemeProvider>
    <CSSReset />
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/scanner" component={Scanner} exact={true} />
            <Route path="/history" component={History} exact={true} />
            <Route
              path="/"
              render={() => <Redirect to="/scanner" />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="scanner" href="/scanner">
              <IonIcon icon={scanOutline} />
              <IonLabel>Scanner</IonLabel>
            </IonTabButton>
            <IonTabButton tab="history" href="/history">
              <IonIcon icon={folderOpenOutline} />
              <IonLabel>History</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  </ThemeProvider>
)

export default App
