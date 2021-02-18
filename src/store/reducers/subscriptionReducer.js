import { SET_STATE } from '../constants'

const initialState = {
  subscriptions: {
    allEntities: [],
    entities: {},
  },
}

export const subscriptionReducer = (
  state = initialState,
  { type, payload }
) => {
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
