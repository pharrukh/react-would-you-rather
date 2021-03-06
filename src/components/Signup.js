import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { handleAddUser } from '../actions/users'

class Signup extends Component {
    state = {
        name: '',
        avatarURL: ''
    }

    handleAddUser = async () => {
        const { history } = this.props
        this.props.dispatch(handleAddUser(this.state.name, this.state.avatarURL))
        history.push('/')
    }

    render() {
        return (
            <form className="signup-form" onSubmit={e => e.preventDefault()}>
                <div className='title'>create a new user</div>
                <input type='text' name="username" value={this.state.name} onChange={e => { e.preventDefault(); this.setState({ ...this.setState, name: e.target.value }) }} placeholder='name' />
                <input type='text' name="avatar-url" value={this.state.avatarURL} onChange={e => { e.preventDefault(); this.setState({ ...this.setState, avatarURL: e.target.value }) }} placeholder='avatar url' />
                <div className="submit-section">
                    <input type='submit' name='submit' value="sign up" onClick={this.handleAddUser} disabled={!this.state.name || !this.state.avatarURL} />
                </div>
            </form>
        )
    }
}

export default withRouter(connect()(Signup))