import React, { useState } from 'react';
import '../styles.css';

const formatter = new Intl.NumberFormat();

// TODO: Implement this number formatter on inputs: 
// https://bitbucket.org/rlestate/main/src/master/client/src/site-two/FilterBar/PriceSelectDrop.jsx
const LowHighFilter = ({ item, setItem, name, type }) => {

    const [isEditingLow, setIsEditingLow] = useState(false);
    const [isEditingHigh, setIsEditingHigh] = useState(false);

    const handleChangeLow = (e) => {
        let updateItem = e;
        if (updateItem === '') {
            updateItem = 'Min';
        }
        setItem({ low: updateItem, high: item.high });
    }

    const handleChangeHigh = (e) => {
        let updateItem = e;
        if (updateItem === '') {
            updateItem = 'Max';
        }
        setItem({ low: item.low, high: updateItem });
    }

    const resetAmounts = () => {
        setItem({ low: 'Min', high: 'Max' });
    }

    // Renders a dollar sign if it is a price, a 'ft' if square feet, or nothing
    const renderTypeIcon = () => {
        switch (type) {
            case '$':
                return <p className="low-high-dollar">$</p>;
            case 'ft':
                return <p className="low-high-feet">ft.</p>;
            default:
                return null;
        }
    }

    // Only renders the reset button if either of the two inputs are non-zero
    const renderResetButton = () => {
        if (item.low != 'Min' || item.high != 'Max') {
            return (
                <button className="low-high-reset-container" onClick={() => resetAmounts()}>
                    <img src={'frontend/images/reset.png'} alt="reset filter" className="low-high-reset-img" />
                </button>
            )
        } else {
            return (
                <button className="low-high-reset-container reset-hidden">
                    <img src={'frontend/images/reset.png'} alt="reset filter" className="low-high-reset-img" />
                </button>
            )
        }
    }

    return (
        <div>
            <p className="low-high-text">{name}</p>
            <div className="low-high-row">
                <div className="low-high-container">
                    {renderTypeIcon()}
                    {isEditingLow ? (
                        <input
                            className="low-high-input"
                            type="number"
                            value={item.low}
                            onChange={(e) => handleChangeLow(e.target.value)}
                            onBlur={(e) => {
                                setIsEditingLow(false);
                            }}
                        />
                    ) : (
                        <input
                            className="low-high-input"
                            type="text"
                            value={item.low === 'Min' || type === 'year' ? item.low : formatter.format(item.low)}
                            onFocus={() => setIsEditingLow(true)}
                            readOnly
                        />
                    )}
                </div>

                <div className="low-high-container">
                    {renderTypeIcon()}
                    {isEditingHigh ? (
                        <input
                            className="low-high-input"
                            type="number"
                            value={item.high}
                            onChange={(e) => handleChangeHigh(e.target.value)}
                            onBlur={(e) => {
                                setIsEditingHigh(false);
                            }}
                        />
                    ) : (
                        <input
                            className="low-high-input"
                            type="text"
                            value={item.high === 'Max' || type === 'year' ? item.high : formatter.format(item.high)}
                            onFocus={() => setIsEditingHigh(true)}
                            readOnly
                        />
                    )}
                </div>
                {renderResetButton()}
            </div>
        </div>
    )
}

export default LowHighFilter;