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

export function addUser(name, avatarURL) {
    return {
        type: ADD_USER,
        user: {
            name,
            avatarURL
        }
    }
}

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}