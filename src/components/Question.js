import React, { Component } from 'react'

class Question extends Component {
    render() {
        const { author, question } = this.props
        const { name, avatarURL } = author
        const { optionOne, optionTwo } = question

        return (
            <card className="question">
                <div className="title">{name} asks:</div>
                <div className="content">
                    <div className="avatar"><img src={avatarURL} /></div>
                    <hr class="divider" />
                    <div>
                        <p>Would you rather ...</p>
                        <form>
                            <input type="radio" id="optionOne" name='question' value={optionOne.text} />
                            <label for="optionOne">{optionOne.text}</label><br />
                            <input type="radio" id="OptionTwo" name='question' value={optionTwo.text} />
                            <label for="OptionTwo">{optionTwo.text}</label><br />
                            <div>
                                <input type="submit" value="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </card>
        )
    }
}

export default Question