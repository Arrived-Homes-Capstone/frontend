import React, { useState, useEffect, useRef } from 'react';
import LowHighFilter from './LowHighFilter';

const MoreFilters = () => {
    // Hide on click
    const ref = useRef();
    const [isOpen, setIsOpen] = useState(false);
    useOnClickOutside(ref, () => setIsOpen(false));

    const [listPrice, setListPrice] = useState({ low: '1', high: '10' });

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
                    ?
                    <button className="flex-row filter-more-container filter-more-touch type-pressed" onClick={() => handleCloseOpen()}>
                        <img src={'/images/filter_white.png'} alt="filter" className="filter-more-img filter-more-touch" />
                    </button>
                    : 
                    <button className="flex-row filter-more-container" onClick={() => handleCloseOpen()}>
                        <img src={'/images/filter_gray.png'} alt="filter" className="filter-more-img" />
                    </button>
                }
            </div>

            {/* Button after click */}
            { isOpen &&
                <div ref={ref} className="filter-type-options">
                {/* TODO: Implement a map that creates all the necessary low-high filters, make this update the API call too */}
                <LowHighFilter item={listPrice} setItem={setListPrice} name={"List Price"} />
                    <button className="filter-type-done" onClick={() => handleCloseOpen()}>Save current filters</button>
                    <button className="filter-type-done filter-more-trans" onClick={() => handleCloseOpen()}>Load previous filters</button>
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
            if (event.target.className && event.target.className.includes('filter-more-touch')) {
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

export default MoreFilters;