import { SET_STATE } from '../constants'

const initialState = {
  isAuth: false,
  currentUser: null,
  selectedUser: null,
  users: {
    allEntities: [],
    entities: {},
  },
}

export const userReducer = (state = initialState, { type, payload }) => {
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
