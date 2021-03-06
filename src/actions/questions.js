import { _saveQuestion, _saveQuestionAnswer } from '../_DATA'
import { hideLoading, showLoading } from '../actions/loading'
import { handleLoadData } from './shared'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function answerQuestion(answer) {
    return {
        type: ANSWER_QUESTION,
        answer
    }
}

export function handleAddQuestion(question) {
    return (dispatch) => {
        dispatch(showLoading())
        return _saveQuestion(question)
            .then((question) => {
                dispatch(addQuestion(question))
                dispatch(hideLoading())
            })
    }
}

export function handleAnswerQuestion(answer) {
    return (dispatch) => {
        dispatch(showLoading())
        return _saveQuestionAnswer(answer)
            .then(answer => {
                dispatch(answerQuestion(answer))
                dispatch(hideLoading())
            })
    }
}