import { ADD_USER, LOGIN_USER, LOGOUT_USER, RECEIVE_USERS } from '../actions/users'
import { ANSWER_QUESTION } from '../actions/questions'

export default function users(state = {}, action) {
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
        case ADD_USER:
            const users = state.users
            users[action.user.id] = action.user
            return {
                ...state,
                users
            }
        case RECEIVE_USERS:
            return {
                ...state,
                users: action.users
            }
        case ANSWER_QUESTION:
            const { answer, qid, authedUser } = action.answer
            state.users[authedUser].answers[qid] = answer
            return state
        default:
            return state
    }
}