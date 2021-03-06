import { hideLoading, showLoading } from '../actions/loading';
import { _signup } from '../_DATA'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const ADD_USER = 'ADD_USER'
export const RECEIVE_USERS = 'RECEIVE_USERS'

export function loginUser(userId) {
    return {
        type: LOGIN_USER,
        userId
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER
    }
}

export function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}

export function handleAddUser(name, avatarURL) {
    return (dispatch) => {
        dispatch(showLoading())
        return _signup(name, avatarURL)
            .then((user) => {
                dispatch(addUser(user))
                dispatch(hideLoading())
            })
    }
}

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}