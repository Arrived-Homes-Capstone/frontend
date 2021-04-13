import React, { useState } from 'react';
import AgentNotesSingle from './AgentNotesSingle'
import '../styles.css';

// This component renders a left and right button with a singular agent note in the middle to 
// scroll through all the agent notes of the property
const AgentNotesList = ({ address, agentNotes }) => {
    const [index, setIndex] = useState(0);

    const renderLeft = () => {
        if (index > 0) {
            return (
                <button className="agent-btn" onClick={() => setIndex(index - 1)}>
                    <img className="arrow-img" src={'/images/left_arrow_on.png'} alt="scroll left" />
                </button>
            )
        } else {
            return (
                <button className="agent-btn" style={{ cursor: 'default' }} disabled>
                    <img className="arrow-img" src={'/images/left_arrow_off.png'} alt="scroll left" />
                </button>
            )
        }
    }

    const renderRight = () => {
        if (index < agentNotes.length - 1) {
            return (
                <button className="agent-btn" onClick={() => setIndex(index + 1)}>
                    <img className="arrow-img" src={'/images/right_arrow_on.png'} alt="scroll right" />
                </button>
            )
        } else {
            return (
                <button className="agent-btn" style={{ cursor: 'default' }} >
                    <img className="arrow-img" src={'/images/right_arrow_off.png'} alt="scroll right" />
                </button>
            )
        }
    }

    return (
        <div className="agent-container">
            <p className="prop-title" style={{ textAlign: 'center' }}>{address}</p>
            <div className="agent-row">
                <div className="agent-col">
                    {renderLeft()}
                </div>
                <AgentNotesSingle note={agentNotes[index]} />
                <div className="agent-col">
                    {renderRight()}
                </div>
            </div>
        </div>
    )
}

export default AgentNotesList;