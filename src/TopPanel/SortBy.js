import React, { useState, useEffect, useRef } from 'react';

// Sort the right panel houses by either most or least recent or the IRR or Dividend Yield proforma values 
const options = [
    { value: 'MostRecent', label: 'Date Listed (newest)' },
    { value: 'LeastRecent', label: 'Date Listed (oldest)' },
    { value: 'InvestorIRR', label: 'Best Investor IRR' },
    { value: 'InvestorYield', label: 'Best Dividend Yield' },
];

const SortBy = ({ sortOrder, setSortOrder }) => {
    // Create a ref that we add to the element for which we want to detect outside clicks
    const ref = useRef();
    // State for our modal
    const [isOpen, setIsOpen] = useState(false);
    // Call hook passing in the ref and a function to call on outside click
    useOnClickOutside(ref, () => setIsOpen(false));

    const renderOptions = () => {
        return options.map(option => (
            <button className={sortOrder === option.value ? "filter-sort-option option-chosen" : "filter-sort-option"}
                onClick={() => chooseSort(option)} key={option.value}>
                <p className="sort-option-text">{option.label}</p>
            </button>
        ))
    }

    const chooseSort = (option) => {
        setSortOrder(option.value);
        setIsOpen(false);
    }

    const handleCloseOpen = () => {
        if (!isOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }

    return (
        <div>
            <button className="flex-row filter-sort-container filter-sort-touch" onClick={() => handleCloseOpen()}>
                <img src={'images/sort.png'} className="filter-sort filter-sort-touch" alt="sort" />
                <p className="filter-sort-text filter-sort-touch">SORT BY</p>
            </button>
            { isOpen &&
                <div ref={ref} className="filter-sort-options">
                    {renderOptions()}
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
            if (event.target.className && event.target.className.includes('filter-sort-touch')) {
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

export default SortBy;