import { createRxDatabase, addRxPlugin } from "rxdb"
import { RxDBValidatePlugin } from "rxdb/plugins/validate"
addRxPlugin(RxDBValidatePlugin)
addRxPlugin(require("pouchdb-adapter-idb"))

let db = null

export const createStoreDB = () => {
  db = createRxDatabase({
    name: "/qr-scanner",
    adapter: "idb",
    ignoreDuplicate: true,
    eventReduce: true,
  })
  return db
}

export const getDataBase = () => {
  if (!db) db = createStoreDB()
  return db
}
