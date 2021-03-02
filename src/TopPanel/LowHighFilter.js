import React from 'react'

const LowHighFilter = ({ item, setItem, name }) => {
    const handleChangeLow = (e) => {
        let updateItem = item.low;
        updateItem = e.target.value;
        setItem({low: updateItem, high: item.high});
    }

    const handleChangeHigh = (e) => {
        let updateItem = item.high;
        updateItem = e.target.value;
        setItem({low: item.low, high: updateItem});
    }

    return (
        <div>
            <p>{name}</p>
            <input type="text" value={item.low} onChange={(e) => handleChangeLow(e)} />
            <input type="text" value={item.high} onChange={(e) => handleChangeHigh(e)} />
        </div>
    )
}

export default LowHighFilter;