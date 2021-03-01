import React, { Component } from 'react'
import LeaderCard from './LeaderCard'

class Leaders extends Component {
    render() {
        const { users } = this.props
        const rating = Object.keys(users).map(id => ({ id, score: Object.keys(users[id].answers).length + users[id].questions.length }))
            .sort((a, b) => b.score - a.score)
        return (
            <div className="leaders">
                <LeaderCard author={users[rating[0].id]} place={1} />
                <LeaderCard author={users[rating[1].id]} place={2} />
                <LeaderCard author={users[rating[2].id]} place={3} />
            </div>
        )
    }
}

export default Leaders