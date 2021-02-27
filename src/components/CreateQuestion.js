import React, { Component } from 'react'

class CreateQuestion extends Component {
    render() {
        return (<div className='question'>
            <div className='title'>Create Question</div>
            <div className="hint">
                <div>Complete the question:</div>
                <div>Would you rather...</div>
                <input className="answer-option" type='text' id="optionOne" /><br />
          or<br />
                <input className="answer-option" type='text' id="optionTwo" /><br />
                <div className="submit-section">
                    <input type="submit" value="submit" />
                </div>
            </div>
        </div>)
    }
}

export default CreateQuestion