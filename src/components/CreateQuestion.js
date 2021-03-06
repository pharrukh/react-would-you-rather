import React, { Component } from 'react'
import { handleAddQuestion } from '../actions/questions'
import { connect } from 'react-redux'

class CreateQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: ''
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
                    <input type="submit" value="submit" onClick={() => this.props.dispatch(handleAddQuestion({ optionOneText: this.state.optionOne, optionTwoText: this.state.optionTwo, author: this.props.authedUser }))} />
                </div>
            </form>
        </div>)
    }
}

function mapStateToProps({ users }) {
    return { authedUser: users.authedUser }
}

export default connect(mapStateToProps)(CreateQuestion)