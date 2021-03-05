import { LOGIN_USER, LOGOUT_USER } from '../actions/users'

export default function users(state = [], action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                authedUser: action.userId
            }
        case LOGOUT_USER:
            return {
                ...state,
                authedUser: null
            }
        default:
            return state
    }
}