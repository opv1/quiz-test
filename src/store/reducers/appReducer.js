import { SET_STATE } from '../constants'

const initialState = {
  storageName: 'quizTest',
  isAuth: false,
  currentUser: null,
  selectedUser: null,
  user: {
    entities: {},
  },
  post: {
    allEntities: [],
    entities: {},
  },
  like: {
    allEntities: [],
    entities: {},
  },
  subscription: {
    allEntities: [],
    entities: {},
  },
}

export const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_STATE:
      return {
        ...state,
        ...payload,
      }
    default:
      return state
  }
}

export const setState = (state) => {
  return {
    type: SET_STATE,
    payload: state,
  }
}
