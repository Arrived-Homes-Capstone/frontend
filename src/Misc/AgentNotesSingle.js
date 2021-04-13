import React from 'react';
import '../styles.css';

// This is the single Agent Note formatted
const AgentNotesSingle = ({ note }) => {

    return (
        <div>
            <p>{note.DateOnSite}</p>
        </div>
    )
}

export default AgentNotesSingle;