import History from "./history.collection"

const set = async (data) => {
  const HistoryCol = await History
  return HistoryCol.atomicUpsert({
    id: `${Date.now()}-history`,
    ...data,
  })
}

const subscribe = async (handler) => {
  const history = await History
  return history.find().$.subscribe(handler)
}

const deleteHistory = async () => {
  const history = await History
  const data = await history.find().exec()
  return data.map((item) => item.remove())
}

const deleteById = async (id) => {
  const history = await History
  const doc = await history.findOne().where("id").eq(id)
  return doc.remove()
}
const controllers = {
  set,
  subscribe,
  deleteHistory,
  deleteById,
}

export default controllers
