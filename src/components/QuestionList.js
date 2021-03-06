import React, { Component } from 'react'
import Question from './Question'
import { connect } from 'react-redux'

class QuestionList extends Component {
    state = {
        mode: 'unanswered'
    }

    render() {
        const { users, questions, authedUser } = this.props

        const mode = this.state.mode

        const answeredQuestions = getAnsweredQuestionsSection(users, questions, authedUser)
        const unansweredQuestions = getUnansweredQuestionsSection(users, questions, authedUser)

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

const getUnansweredQuestionsSection = (users, questions, authedUser) => {

    const unansweredQuestions = Object.keys(questions)
        .filter(id => !Object.keys(users[authedUser].answers).includes(id))

    if (unansweredQuestions.length === 0) {
        return <div className="empty-section">you answered all 👍</div>
    }

    return unansweredQuestions
        .map(id => questions[id])
        .sort((a, b) => b.timestamp - a.timestamp)
        .map(question => mapToQuestion(users, question, 'to-answer'))

}

const getAnsweredQuestionsSection = (users, questions, authedUser) => {

    if (Object.keys(users[authedUser].answers).length === 0) {
        return <div className="empty-section">nothing answered yet 🤷‍♂️</div>
    }

    return Object.keys(users[authedUser].answers)
        .map(id => questions[id])
        .sort((a, b) => b.timestamp - a.timestamp)
        .map(question => mapToQuestion(users, question, 'preview'))

}

const mapToQuestion = (users, question, mode) => {
    const user = users[question.author]
    return <Question key={question.id} question={question} author={user} mode={mode} />
}

export default connect()(QuestionList)