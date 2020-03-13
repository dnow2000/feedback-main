import { createDataReducer } from 'redux-thunk-data'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const dataPersistConfig = {
  key: 'science-feedback-webapp-data',
  storage,
  whitelist: [],
}

const dataReducer = createDataReducer()

export default persistReducer(dataPersistConfig, dataReducer)
