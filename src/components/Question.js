import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Question extends Component {
    render() {
        const { author, question, mode } = this.props
        const { name, avatarURL } = author
        const { id, optionOne, optionTwo } = question

        const questionSection = <form>
            <input type="radio" id="optionOne" name='question' value={optionOne.text} />
            <label for="optionOne">{optionOne.text}</label><br />
            <input type="radio" id="OptionTwo" name='question' value={optionTwo.text} />
            <label for="OptionTwo">{optionTwo.text}</label><br />
            <div>
                <input type="submit" value="submit" />
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
                    <div className="avatar"><img src={avatarURL} /></div>
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