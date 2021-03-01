import React, { Component } from 'react'
import Question from './Question'

class QuestionList extends Component {
    render() {
        const { users, questions, authedUser } = this.props

        const mode = 'answered'
        const answeredQuestions = Object.keys(users[authedUser].answers).map(id => mapToQuestion(users, questions, id))
        const unansweredQuestions = Object.keys(questions)
            .filter(id => !Object.keys(users[authedUser].answers).includes(id))
            .map(id => mapToQuestion(users, questions, id))
        const selectedQuestions = mode === 'answered' ? answeredQuestions : unansweredQuestions
        const anweredTitleClasses = mode === 'answered' ? "right-title" : "right-title active"
        const unanweredTitleClasses = mode === 'answered' ? "left-title active" : "left-title"

        return (<div className="question-list">
            <div className="section-title">
                <div className={unanweredTitleClasses}>Unanswered</div>
                <div className={anweredTitleClasses}>Answered</div>
            </div>
            {selectedQuestions}
        </div>)
    }
}


const mapToQuestion = (users, questions, id) => {
    const question = questions[id]
    const user = users[question.author]
    return <Question key={id} question={question} author={user} mode="preview" />
}

export default QuestionList