import { getDataBase } from "./index"

async function History() {
  const db = await getDataBase()
  const collection = await db.collection({
    name: "history",
    schema: {
      title: "history schema",
      version: 0,
      description: "this is the schema of the history",
      type: "object",
      properties: {
        id: {
          type: "string",
          primary: true,
        },
        text: { type: "string" },
      },
    },
  })
  return collection
}

export default History()
