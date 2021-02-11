import React, { useState, useEffect, useRef  } from 'react';
import onClickOutside from "react-onclickoutside";

const options = [
    { value: 'relevant', label: 'Most Relevant' },
    { value: 'old2new', label: 'Date Listed (oldest)' },
    { value: 'new2old', label: 'Date Listed (newest)' },
];

const SortBy = ({ sortType, setSortType }) => {
    // Create a ref that we add to the element for which we want to detect outside clicks
    const ref = useRef();
    // State for our modal
    const [isOpen, setIsOpen] = useState(false);
    // Call hook passing in the ref and a function to call on outside click
    useOnClickOutside(ref, () => setIsOpen(false));

    const renderOptions = () => {
        return options.map(option => (
            <button className={sortType === option.value ? "filter-sort-option option-chosen" : "filter-sort-option"}
                onClick={() => chooseSort(option)} key={option.value}>
                <p className="sort-option-text">{option.label}</p>
            </button>
        ))
    }

    const chooseSort = (option) => {
        setSortType(option.value);
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
            <button className="flex-row filter-sort-container" onClick={() => handleCloseOpen()}>
                <img src={'/images/sort.png'} className="filter-sort" alt="sort" />
                <p className="filter-sort-text">SORT BY</p>
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

export default SortBy;