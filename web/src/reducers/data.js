import { createDataReducer } from 'redux-saga-data'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const dataPersistConfig = {
  key: 'science-feedback-web-data',
  storage,
  whitelist: [],
}

const dataReducer = createDataReducer({
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
