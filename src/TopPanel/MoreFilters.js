import React, { useState, useEffect, useRef } from 'react';
import LowHighFilter from './LowHighFilter';
import DropdownFilter from './DropdownFilter';
import { daysOnMarketOptions, priceReducedOptions } from './MoreFilterOptions';

const MoreFilters = () => {
    // Hide on click
    const ref = useRef();
    const [isOpen, setIsOpen] = useState(false);
    useOnClickOutside(ref, () => setIsOpen(false));

    const [listPrice, setListPrice] = useState({ low: 'Min', high: 'Max' });
    const [offerPrice, setOfferPrice] = useState({ low: '1000', high: '20000' });
    const [rentalPrice, setRentalPrice] = useState({ low: '1000', high: '20000' });
    const [squareFeet, setSquareFeet] = useState({ low: 'Min', high: '1700' });
    const [beds, setBeds] = useState({ low: 'Min', high: '3' });
    const [baths, setBaths] = useState({ low: '1.5', high: '3' });
    const [yearBuilt, setYearBuilt] = useState({ low: '1970', high: 'Max' });

    const [onMarket, setOnMarket] = useState('Any');
    const [priceReduced, setPriceReduced] = useState('In the last 30 days');

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
                <LowHighFilter item={listPrice} setItem={setListPrice} name="Listing Price" type="$" />
                <LowHighFilter item={offerPrice} setItem={setOfferPrice} name="Offer Price" type="$" />
                <LowHighFilter item={rentalPrice} setItem={setRentalPrice} name="Rental Price" type="$" />
                <LowHighFilter item={squareFeet} setItem={setSquareFeet} name="Square Feet" type="ft" />
                <LowHighFilter item={beds} setItem={setBeds} name="Beds" type="" />
                <LowHighFilter item={baths} setItem={setBaths} name="Baths" type="" />
                <LowHighFilter item={yearBuilt} setItem={setYearBuilt} name="Year Built" type="" />

                {/* <DropdownFilter item={onMarket} setItem={setOnMarket} itemOptions={daysOnMarketOptions} name="Days on Market" /> */}
                {/* <DropdownFilter item={priceReduced} setItem={setPriceReduced} itemOptions={priceReducedOptions} name="Price Reduced" /> */}
                
                {/* <button className="filter-type-done" onClick={() => handleCloseOpen()}>Save current filters</button>
                <button className="filter-type-done filter-more-trans" onClick={() => handleCloseOpen()}>Load previous filters</button> */}
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