import { ADD_QUESTION, RECEIVE_QUESTIONS, ANSWER_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                questions: action.questions
            }
        case ADD_QUESTION:
            const questions = state.questions
            questions[action.question.id] = action.question
            return {
                ...state,
                questions
            }
        default:
            return state
    }
}