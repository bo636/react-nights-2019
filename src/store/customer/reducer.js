import { LOGOUT, SET_CUSTOMER } from './actions'
import { removeToken } from '../../utils/token'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CUSTOMER:
      return action.payload
    case LOGOUT:
      removeToken()
      return {}
    default:
      return state
  }
}

export default reducer
