import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Question extends Component {

    state = { asnwer: null }

    render() {
        const { author, question, mode, onQuestionAnswered } = this.props
        const { name, avatarURL } = author
        const { id, optionOne, optionTwo } = question

        const questionSection = <form onSubmit={e => e.preventDefault()}>
            <input type="radio" id="optionOne" name='question' value={optionOne.text} onChange={() => this.setState({ answer: 'optionOne' })} />
            <label htmlFor="optionOne">{optionOne.text}</label><br />
            <input type="radio" id="OptionTwo" name='question' value={optionTwo.text} onChange={() => this.setState({ answer: 'optionTwo' })} />
            <label htmlFor="OptionTwo">{optionTwo.text}</label><br />
            <div>
                <input type="submit" value="submit" onClick={() => { onQuestionAnswered(id, this.state.answer) }} />
            </div>
        </form>

        const previewSection = <div className="preview-section">
            <div>...{optionOne.text}</div>
            <button className="view-poll-button"><Link to={`/question/${id}`}>view poll</Link></button>
        </div>

        const mainSection = mode === 'preview' ? previewSection : questionSection

        return (
            <div className="question card">
                <div className="title">{name} asks:</div>
                <div className="content">
                    <div className="avatar"><img alt="avatar" src={avatarURL} /></div>
                    <hr className="divider" />
                    <div>
                        <p>Would you rather ...</p>
                        {mainSection}
                    </div>
                </div>
            </div>
        )
    }
}

export default Question