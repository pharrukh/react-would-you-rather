import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LoginPanel extends Component {
    state = { selectValue: '-' }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({ selectValue: e.target.value })
    }

    render() {
        const { users, handleLogin } = this.props
        const usersOptions = Object.keys(users).map(id => (<option key={id} value={id}>{users[id].name}</option>))

        return (<div className="login-panel">
            <div className="title">Welcome to the Would You Rather app</div>
            <img className="logo" alt="logo" src="https://www.normuradov.com/assets/muslim_star.png" />
            <p>Please sign in to continue</p>
            <form onSubmit={e => e.preventDefault()}>
                <select id="users" name="users" defaultValue={this.state.selectValue} onChange={this.handleChange} >
                    <option disabled defaultValue="-">-</option>
                    {usersOptions}
                </select>
                <input type="submit" value="submit" onClick={() => handleLogin(this.state.selectValue)} disabled={this.state.selectValue === '-'} />
            </form>
            <Link to='/signup'><button className='sign-up-button'>sign up</button></Link>
        </div>)
    }
}
export default LoginPanel