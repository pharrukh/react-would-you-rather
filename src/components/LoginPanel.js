import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../actions/users';
import { connect } from 'react-redux'

class LoginPanel extends Component {
    state = { selectValue: 'please sign in to continue' }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({ selectValue: e.target.value })
    }

    render() {
        const { users } = this.props
        const usersOptions = Object.keys(users).map(id => (<option key={id} value={id}>{users[id].name}</option>))

        return (<div className="login-panel">
            <div className="title">Welcome to the <br />Would You Rather app</div>
            <img className="logo" alt="logo" src="https://www.normuradov.com/assets/muslim_star.png" />
            <form onSubmit={e => e.preventDefault()}>
                <select id="users" name="users" defaultValue={this.state.selectValue} onChange={this.handleChange} >
                    <option disabled defaultValue="please sign in to continue">please sign in to continue</option>
                    {usersOptions}
                </select>
                <input type="submit" value="submit" onClick={() => this.props.dispatch(loginUser(this.state.selectValue))} disabled={this.state.selectValue === 'please sign in to continue'} />
                <Link to='/signup' className='sign-up-button'>sign up</Link>
            </form>
        </div>)
    }
}

function mapStateToProps({ users }) {
    return { users: users.users }
}

export default connect()(LoginPanel)