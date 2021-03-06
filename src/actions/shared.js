import { hideLoading, showLoading } from '../actions/loading'
import { _getQuestions, _getUsers } from '../_DATA'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'

export function handleLoadData() {
    return (dispatch) => {
        dispatch(showLoading())
        return _getUsers()
            .then((users) => {
                dispatch(receiveUsers(users))
            })
            .then(_ => _getQuestions())
            .then(questions => {
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
}
