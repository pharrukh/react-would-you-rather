import React, { Component } from 'react'
import { useParams } from 'react-router'
import Question from './Question'

class QuestionList extends Component {
    state = {
        mode: 'answered'
    }

    showAnswered = () => {
        this.setState({ mode: 'answered' })
    }

    showUnanswered = () => {
        this.setState({ mode: 'unanswered' })
    }

    render() {
        const { users, questions, authedUser } = this.props

        const mode = this.state.mode
        const answeredQuestions = Object.keys(users[authedUser].answers).map(id => mapToQuestion(users, questions, id, 'preview'))
        const unansweredQuestions = Object.keys(questions)
            .filter(id => !Object.keys(users[authedUser].answers).includes(id))
            .map(id => mapToQuestion(users, questions, id, 'to-answer'))
        const selectedQuestions = mode === 'answered' ? answeredQuestions : unansweredQuestions
        const anweredTitleClasses = mode === 'answered' ? "right-title active" : "right-title"
        const unanweredTitleClasses = mode === 'answered' ? "left-title" : "left-title active"

        return (<div className="question-list">
            <div className="section-title">
                <div className={unanweredTitleClasses} onClick={this.showUnanswered}>Unanswered</div>
                <div className={anweredTitleClasses} onClick={this.showAnswered}>Answered</div>
            </div>
            {selectedQuestions}
        </div>)
    }
}


const mapToQuestion = (users, questions, id, mode) => {
    const question = questions[id]
    const user = users[question.author]
    return <Question key={id} question={question} author={user} mode={mode} />
}

export default QuestionList