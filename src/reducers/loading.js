import { SHOW_LOADING, HIDE_LOADING } from '../actions/loading'

export default function loading(state = [], action) {
    switch (action.type) {
        case SHOW_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case HIDE_LOADING:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}