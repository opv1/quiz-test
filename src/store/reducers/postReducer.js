import { SET_STATE } from '../constants'

const initialState = {
  posts: {
    allEntities: [],
    entities: {},
  },
}

export const postReducer = (state = initialState, { type, payload }) => {
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
