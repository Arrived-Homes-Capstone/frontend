import React from 'react';

const ProformaConstant = ({ value, setValue, name }) => {

    return (
        <div>
            <p className="proformaTitle">{name}</p>
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}

export default ProformaConstant;