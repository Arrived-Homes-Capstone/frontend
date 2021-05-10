import React, { useState, useEffect, useRef } from 'react';

const HouseType = ({ houseTypes, setHouseTypes, updateListings, setReqBody, reqBody }) => {
    const ref = useRef();
    const [isOpen, setIsOpen] = useState(false);
    useOnClickOutside(ref, () => setIsOpen(false));

    // Reloads all the current house type options, either checking or unchecking the selected option
    const handleOptionChoice = (option) => {
        let newHouseTypes = JSON.parse(JSON.stringify(houseTypes));
        newHouseTypes[option.index].selected = !houseTypes[option.index].selected;
        setHouseTypes(newHouseTypes);
    }

    const renderOptions = () => {
        return houseTypes.map((option, index) => (
            <button className="filter-type-btn flex-row" onClick={() => handleOptionChoice(option)} key={index}>
                { option.selected
                    ? <img src={'images/check_clicked.png'} alt="checkbox empty" className="filter-check" />
                    : <img src={'images/check_empty.png'} alt="checkbox empty" className="filter-check" />
                }
                <p style={{ textAlign: 'left' }}>{option.label}</p>
            </button>
        ));
    }

    const handleCloseOpen = () => {
        if (!isOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }

    const handleDone = async () => {
        const res = [];
        for (let i = 0; i < houseTypes.length; i++) {
            if (houseTypes[i].selected) {
                res.push(houseTypes[i].value)
            }
        }
        await setReqBody({
            ...reqBody,
            HomeTypes: res
        });
        //updateListings();
        handleCloseOpen();
    }

    return (
        <div>
            {/* Button before click */}
            <div className="flex-row">
                {isOpen
                    ? <button className="flex-row filter-type-container filter-type-touch type-pressed" onClick={() => handleCloseOpen()} >House Type</button>
                    : <button className="flex-row filter-type-container filter-type-touch" onClick={() => handleCloseOpen()}>House Type</button>
                }

                <div className="filter-type-arrow">
                    {isOpen
                        ? <img src={'images/down_arrow_white.png'} className="downarrow filter-type-touch" alt="down_arrow" onClick={() => handleCloseOpen()} />
                        : <img src={'images/down_arrow_2.png'} className="downarrow filter-type-touch" alt="down_arrow" onClick={() => handleCloseOpen()} />
                    }
                </div>
            </div>

            {/* Button after click */}
            { isOpen &&
                <div ref={ref} className="filter-type-options" style={{ width: 150 }}>
                    <p className="filter-type-title" >Home Type</p>
                    {renderOptions()}
                    <button className="filter-type-done" onClick={() => handleDone()}>Submit</button>
                </div>
            }
        </div>
    );
};

function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = event => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }

            // Do not close if clicking "Home Type" button
            if (event.target.className && event.target.className.includes('filter-type-touch')) {
                return;
            }

            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    },
        [ref, handler]
    );
}

export default HouseType;