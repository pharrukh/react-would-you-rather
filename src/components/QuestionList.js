import React, { Component } from 'react'
import Question from './Question'

class QuestionList extends Component {
    state = {
        mode: 'unanswered'
    }

    render() {
        const { users, questions, authedUser, onQuestionAnswered } = this.props

        const mode = this.state.mode

        const answeredQuestions = Object.keys(users[authedUser].answers)
            .map(id => questions[id])
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(question => mapToQuestion(users, question, 'preview', onQuestionAnswered))

        const unansweredQuestions = Object.keys(questions)
            .filter(id => !Object.keys(users[authedUser].answers).includes(id))
            .map(id => questions[id])
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(question => mapToQuestion(users, question, 'to-answer', onQuestionAnswered))

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


const mapToQuestion = (users, question, mode, onQuestionAnswered) => {
    const user = users[question.author]
    return <Question key={question.id} question={question} author={user} mode={mode} onQuestionAnswered={onQuestionAnswered} />
}

export default QuestionList