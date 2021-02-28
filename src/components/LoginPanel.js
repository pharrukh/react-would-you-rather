import React from 'react'

function LoginPanel({ users }) {
    const usersOptions = Object.keys(users).map(id => (<option key={id} value={id}>{users[id].name}</option>))

    return (<div className="login-panel">
        <h3>Welcome to the Would You Rather app</h3>
        <hr className="divider" />
        <img className="logo" src="https://www.normuradov.com/assets/muslim_star.png" />
        <h4>Please sign in to continue</h4>
        <form>
            <select id="users" name="users">
                {usersOptions}
            </select>
            <input type="submit" value="submit" />
        </form>
    </div>)
}

export default LoginPanel