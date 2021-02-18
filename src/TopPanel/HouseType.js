import React, { useState, useEffect, useRef } from 'react';

const options = [
    { value: 'house', label: 'House' },
    { value: 'condo_coop', label: 'Condo/co-op' },
    { value: 'multi_family', label: 'Multi-family' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'lot_land', label: 'Lot/Land' },
    { value: 'townhouse', label: 'Townhouse' },
];

const HouseType = () => {
    // Create a ref that we add to the element for which we want to detect outside clicks
    const ref = useRef();
    // State for our modal
    const [isOpen, setIsOpen] = useState(false);
    // Call hook passing in the ref and a function to call on outside click
    useOnClickOutside(ref, () => setIsOpen(false));

    const handleOptionChoice = () => {
        console.log('you chose an option');
    }

    // TODO: On click, render the image so it is a checkmark and also call the API to reload the house listings
    // TODO: Get this to be touchable. FIX THE GOOGLE MAP BUG.
    const renderOptions = () => {
        return options.map((option, index) => (
            <button className="filter-type-btn flex-row" onClick={() => handleOptionChoice()}>
                <img src={'/images/check_empty.png'} alt="checkbox empty" className="filter-check" />
                <p>{option.label}</p>
            </button>
        ));
    }

    // const chooseSort = (option) => {
    //     setSortType(option.value);
    //     setIsOpen(false);
    // }

    const handleCloseOpen = () => {
        if (!isOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }

    return (
        <div>
            {/* Button before click */}
            <div className="flex-row">
                {isOpen
                ? <button className="flex-row filter-type-container filter-type-touch type-pressed" onClick={() => handleCloseOpen()} >Home...</button>
                : <button className="flex-row filter-type-container filter-type-touch" onClick={() => handleCloseOpen()}>Home...</button>
                }
                
                <div className="filter-type-arrow">
                    {isOpen
                    ?   <img src={'/images/down_arrow_white.png'} className="downarrow filter-type-touch" alt="down_arrow" onClick={() => handleCloseOpen()} />
                    :   <img src={'/images/down_arrow.png'} className="downarrow filter-type-touch" alt="down_arrow" onClick={() => handleCloseOpen()} />
                    }
                </div>
            </div>

            {/* Button after click */}
            { isOpen &&
                <div ref={ref} className="filter-type-options">
                    <p className="filter-type-title" >Home Type</p>
                    {renderOptions()}
                    <button className="filter-type-done" onClick={() => handleCloseOpen()}>Done</button>
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
            
            // Do not close if clicking "Sort By" button
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
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export default HouseType;