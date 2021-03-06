import { combineReducers } from 'redux'
import loading from './loading'
import users from './users'
import questions from './questions'

export default combineReducers({
    users,
    questions,
    loading
})