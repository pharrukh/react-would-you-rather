import React from 'react'
import { useParams } from 'react-router'
import Stats from './Stats'
import NotFound from './NotFound'

function PollResult({ questions, author, authedUser }) {
    const { id } = useParams()
    console.log('id, ', id)
    const { name, avatarURL } = author
    const question = questions[id]

    if (!question) {
        console.log('test')
        return <NotFound />
    }

    const { optionOne, optionTwo } = question
    const pollSize = optionOne.votes.length + optionTwo.votes.length

    return (<div className="poll-result card">
        <div className="title">Asked by {name}:</div>
        <div className="content">
            <div className="avatar"><img alt="avatar" src={avatarURL} /></div>
            <hr className="divider" />
            <div>
                <Stats optionText={optionOne.text} numberOfVotes={optionOne.votes.length} pollSize={pollSize} isYourVote={optionOne.votes.includes(authedUser)} />
                <Stats optionText={optionTwo.text} numberOfVotes={optionTwo.votes.length} pollSize={pollSize} isYourVote={optionTwo.votes.includes(authedUser)} />
            </div>
        </div>
    </div>)
}

export default PollResult