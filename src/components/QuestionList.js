import React, { Component } from 'react'
import Question from './Question'

class QuestionList extends Component {
    state = {
        mode: 'unanswered'
    }

    render() {
        const { users, questions, authedUser, onQuestionAnswered } = this.props

        const mode = this.state.mode

        const answeredQuestions = getAnsweredQuestionsSection(users, questions, authedUser, onQuestionAnswered)
        const unansweredQuestions = getUnansweredQuestionsSection(users, questions, authedUser, onQuestionAnswered)

        const selectedQuestions = mode === 'answered' ? answeredQuestions : unansweredQuestions
        const anweredTitleClasses = mode === 'answered' ? "right-title active" : "right-title"
        const unanweredTitleClasses = mode === 'answered' ? "left-title" : "left-title active"

        return (<div className="question-list">
            <div className="section-title">
                <div className={unanweredTitleClasses} onClick={() => this.setState({ mode: 'unanswered' })}>Unanswered</div>
                <div className={anweredTitleClasses} onClick={() => this.setState({ mode: 'answered' })}>Answered</div>
            </div>
            {selectedQuestions}
        </div>)
    }
}

const getUnansweredQuestionsSection = (users, questions, authedUser, onQuestionAnswered) => {

    const unansweredQuestions = Object.keys(questions)
        .filter(id => !Object.keys(users[authedUser].answers).includes(id))

    if (unansweredQuestions.length === 0) {
        return <div className="empty-section">you answered all 👍</div>
    }

    return unansweredQuestions
        .map(id => questions[id])
        .sort((a, b) => b.timestamp - a.timestamp)
        .map(question => mapToQuestion(users, question, 'to-answer', onQuestionAnswered))

}

const getAnsweredQuestionsSection = (users, questions, authedUser, onQuestionAnswered) => {

    if (Object.keys(users[authedUser].answers).length === 0) {
        return <div className="empty-section">nothing answered yet 🤷‍♂️</div>
    }

    return Object.keys(users[authedUser].answers)
        .map(id => questions[id])
        .sort((a, b) => b.timestamp - a.timestamp)
        .map(question => mapToQuestion(users, question, 'preview', onQuestionAnswered))

}

const mapToQuestion = (users, question, mode, onQuestionAnswered) => {
    const user = users[question.author]
    return <Question key={question.id} question={question} author={user} mode={mode} onQuestionAnswered={onQuestionAnswered} />
}

export default QuestionList