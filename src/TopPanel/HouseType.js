import React, { useState, useEffect, useRef } from 'react';

const options = [
    { value: 'relevant', label: 'Most Relevant' },
    { value: 'old2new', label: 'Date Listed (oldest)' },
    { value: 'new2old', label: 'Date Listed (newest)' },
];

const HouseType = () => {
    // Create a ref that we add to the element for which we want to detect outside clicks
    const ref = useRef();
    // State for our modal
    const [isOpen, setIsOpen] = useState(false);
    // Call hook passing in the ref and a function to call on outside click
    useOnClickOutside(ref, () => setIsOpen(false));

    const renderOptions = () => {
        return options.map(option => (
            <p>{option}</p>
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
                <button className="flex-row filter-type-container" onClick={() => handleCloseOpen()}>
                    Home...
                </button>
                <div className="filter-type-arrow">
                    {isOpen
                    ?   <img src={'/images/down_arrow_white.png'} className="downarrow" alt="down_arrow" />
                    :   <img src={'/images/down_arrow.png'} className="downarrow" alt="down_arrow" />
                    }
                </div>
            </div>

            {/* Button after click */}
            { isOpen &&
                <div ref={ref} className="filter-type-options">
                    <p>Home Type</p>
                    {/* {renderOptions()} */}
                    <button onClick={() => handleCloseOpen()}>Done</button>
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
            if (event.target.className && event.target.className.includes('filter-sort-text')) {
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