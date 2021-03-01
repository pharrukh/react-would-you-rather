import React from 'react'
import { AiFillTrophy } from 'react-icons/ai'

function LeaderCard({ author, place }) {
    const { name, avatarURL } = author
    const numberOfAnswers = Object.keys(author.answers).length
    const numberOfQuestions = author.questions.length
    const score = numberOfAnswers + numberOfQuestions
    
    return (
        <div className='card note'>
            <p><AiFillTrophy color={getColorFrom(place)} /></p>
            <div className="avatar">
                <img src={avatarURL} />
            </div>
            <hr className="divider" />
            <div className="user-stats">
                <div className='user-name'>{name}</div>
                <div>Answered {numberOfAnswers}</div>
                <hr className="divider" />
                <div>Created {numberOfQuestions}</div>
            </div>
            <hr className="divider" />
            <div className="score-card">
                <div className="score-title">Score</div>
                <div className="score-number circle-base">{score}</div>
            </div>
        </div>
    )
}

function getColorFrom(place) {
    switch (place) {
        case 1:
            return 'gold'
        case 2:
            return 'silver'
        case 3:
            return 'copper'
    }
}

export default LeaderCard