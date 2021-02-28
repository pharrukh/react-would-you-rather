import React from 'react'

function Stats({ optionText, numberOfVotes, pollSize, isYourVote }) {
    const yourVoteBadge = isYourVote ? <span className="stats-badge">Your Vote</span> : ''
    const percentage = Math.round(((numberOfVotes / pollSize) * 10 + Number.EPSILON) * 100) / 10
    const label = percentage !== 0 ? `${percentage}%` : ''

    return (<div className="stats">
        {yourVoteBadge}
        <div className='details'>Would you rather {optionText}</div>
        <div className="progressbar" >
            <div style={{ width: percentage + '%' }}>{label}</div>
        </div>
        <div className="details">{numberOfVotes} out of {pollSize}</div>
    </div>)
}

export default Stats