import { createDataReducer } from 'redux-thunk-data'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const dataPersistConfig = {
  key: 'science-feedback-webapp-data',
  storage,
  whitelist: [],
}

const dataReducer = createDataReducer({
  articleTags: [],
  articles: [],
  evaluations: [],
  reviewTags: [],
  reviews: [],
  roleTypes: [],
  roles: [],
  tags: [],
  trendings: [],
  userArticles: [],
  userTags: [],
  users: [],
  verdictTags: [],
  verdictUsers: [],
  verdicts: []
})

export default persistReducer(dataPersistConfig, dataReducer)
