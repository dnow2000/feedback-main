import { createData } from 'pass-culture-shared'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const dataPersistConfig = {
  key: 'web-data',
  storage,
  whitelist: [],
}

const dataReducer = createData({
  articleTags: [],
  articles: [],
  evaluations: [],
  reviewTags: [],
  reviews: [],
  tags: [],
  trendings: [],
  userTags: [],
  users: [],
  verdictTags: [],
  verdictUsers: [],
  verdicts: []
})

const data = persistReducer(dataPersistConfig, dataReducer)

export default data
