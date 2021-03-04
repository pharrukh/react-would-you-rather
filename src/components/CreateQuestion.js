import React, { Component } from 'react'

class CreateQuestion extends Component {
    state = {
    }

    handleAddQuestion = async () => {
        const { handleAddQuestion, userId } = this.props
        this.setState({ optionOne: '', optionTwo: '' })
        await handleAddQuestion(this.state.optionOne, this.state.optionTwo, userId)
    }

    render() {
        return (<div className='card question'>
            <div className='title'>Create Question</div>
            <form className="hint" onSubmit={e => e.preventDefault()}>
                <div>Complete the question:</div>
                <div>Would you rather...</div>
                <input className="answer-option" type='text' value={this.state.optionOne} id="optionOne" onChange={e => { e.preventDefault(); this.setState({ ...this.setState, optionOne: e.target.value }) }} /><br />
          or<br />
                <input className="answer-option" type='text' value={this.state.optionTwo} id="optionTwo" onChange={e => { e.preventDefault(); this.setState({ ...this.setState, optionTwo: e.target.value }) }} /><br />
                <div className="submit-section">
                    <input type="submit" value="submit" onClick={()=> this.handleAddQuestion()} />
                </div>
            </form>
        </div>)
    }
}

export default CreateQuestion