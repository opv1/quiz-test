import { combineReducers } from 'redux'
import { appReducer } from './appReducer'
import { likeReducer } from './likeReducer'
import { postReducer } from './postReducer'
import { subscriptionReducer } from './subscriptionReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
  app: appReducer,
  like: likeReducer,
  post: postReducer,
  subscription: subscriptionReducer,
  user: userReducer,
})
