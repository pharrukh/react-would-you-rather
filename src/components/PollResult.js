import React from 'react'
import Stats from './Stats'

function PollResult({ question, author, authedUser }) {
    const { name, avatarURL } = author
    const { optionOne, optionTwo } = question
    const pollSize = optionOne.votes.length + optionTwo.votes.length

    return (<div className="poll-result card">
        <div className="title">Asked by {name}:</div>
        <div className="content">
            <div className="avatar"><img src={avatarURL} /></div>
            <hr className="divider" />
            <div>
                <Stats optionText={optionOne.text} numberOfVotes={optionOne.votes.length} pollSize={pollSize} isYourVote={optionOne.votes.includes(authedUser)} />
                <Stats optionText={optionTwo.text} numberOfVotes={optionTwo.votes.length} pollSize={pollSize} isYourVote={optionTwo.votes.includes(authedUser)} />
            </div>
        </div>
    </div>)
}

export default PollResult