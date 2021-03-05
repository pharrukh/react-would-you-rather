import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { logoutUser } from '../actions/users';
import { connect } from 'react-redux'

class Navigation extends Component {
    render() {
        const { userName } = this.props
        const logoutSection = userName === null ? '' : (<div>
            <div>Hello, {userName}</div>
            <button onClick={() => this.props.dispatch(logoutUser())}>Logout</button>
        </div>)
        const navigationItems = userName === null ? (<ul><li><NavLink to='/' exact activeClassName="nav-active">Home</NavLink></li><li><NavLink to='/leaders' exact activeClassName="nav-active">Leader Board</NavLink></li></ul>) :
            (<ul><li><NavLink to='/' exact activeClassName="nav-active">Home</NavLink></li>
                <li> <NavLink to='/new' exact activeClassName="nav-active">New Question</NavLink></li>
                <li><NavLink to='/leaders' exact activeClassName="nav-active">Leader Board</NavLink></li></ul>)
        return (<nav>
            {navigationItems}
            {logoutSection}
        </nav>)
    }
}


export default connect()(Navigation);