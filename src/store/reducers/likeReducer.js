import { SET_STATE } from '../constants'

const initialState = {
  likes: {
    allEntities: [],
    entities: {},
  },
}

export const likeReducer = (state = initialState, { type, payload }) => {
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
