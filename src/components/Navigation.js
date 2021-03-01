import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Navigation extends Component {
    render() {
        const { userName } = this.props

        return (<nav>
            <ul>
                <li><NavLink to='/' exact activeClassName="nav-active">Home</NavLink></li>
                <li> <NavLink to='/new' exact activeClassName="nav-active">New Question</NavLink></li>
                <li><NavLink to='/leaders' exact activeClassName="nav-active">Leader Board</NavLink></li>
            </ul>
            <div>
                <div>Hello, {userName}</div>
                <button>Logout</button>
            </div>
        </nav>)
    }
}

export default Navigation