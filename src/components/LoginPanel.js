import React, { Component } from 'react'

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
            <h3>Welcome to the Would You Rather app</h3>
            <hr className="divider" />
            <img className="logo" src="https://www.normuradov.com/assets/muslim_star.png" />
            <h4>Please sign in to continue</h4>
            <form onSubmit={e => e.preventDefault()}>
                <select id="users" name="users" defaultValue={this.state.selectValue} onChange={this.handleChange} >
                    <option disabled defaultValue="-">-</option>
                    {usersOptions}
                </select>
                <input type="submit" value="submit" onClick={() => handleLogin(this.state.selectValue)} />
            </form>
        </div>)
    }
}
export default LoginPanel