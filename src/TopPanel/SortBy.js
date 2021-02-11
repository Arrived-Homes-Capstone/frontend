import React, { useState, useEffect, useRef  } from 'react';
import onClickOutside from "react-onclickoutside";

const options = [
    { value: 'relevant', label: 'Most Relevant' },
    { value: 'old2new', label: 'Date Listed (oldest)' },
    { value: 'new2old', label: 'Date Listed (newest)' },
];

// TODO: Make this look more like Figma
// TODO: Make the UX of clicking to close out of it more intuitive
const SortBy = () => {
    // Create a ref that we add to the element for which we want to detect outside clicks
    const ref = useRef();
    // State for our modal
    const [isOpen, setIsOpen] = useState(false);
    // Call hook passing in the ref and a function to call on outside click
    useOnClickOutside(ref, () => setIsOpen(false));

    const renderOptions = () => {
        return options.map(option => (
            <button className="filter-sort-option" onClick={()=>console.log("option chosen")}>
                <p className="sort-option-text">{option.label}</p>
            </button>
        ))
    }

    return (
        <div>
            <button className="flex-row filter-sort-container" onClick={() => setIsOpen(!isOpen)}>
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
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
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