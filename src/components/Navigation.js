import React, { Component } from 'react'

class Navigation extends Component {
    render() {
        const { userName } = this.props

        return (<nav>
            <ul>
                <li className="nav-active">Home</li>
                <li>New Question</li>
                <li>Leader Board</li>
            </ul>
            <div>
                <div>Hello, {userName}</div>
                <button>Logout</button>
            </div>
        </nav>)
    }
}

export default Navigation