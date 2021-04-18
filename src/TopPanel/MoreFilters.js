import React, { useState, useEffect, useRef } from 'react';
import LowHighFilter from './LowHighFilter';
import DropdownFilter from './DropdownFilter';
import { daysOnMarketOptions, priceReducedOptions } from './MoreFilterOptions';

const MoreFilters = ({ setReqBody, reqBody, updateListings }) => {
    // Hide on click
    const ref = useRef();
    const [isOpen, setIsOpen] = useState(false);
    useOnClickOutside(ref, () => setIsOpen(false));

    const [listPrice, setListPrice] = useState({ low: 'Min', high: 'Max' });
    const [offerPrice, setOfferPrice] = useState({ low: 'Min', high: 'Max' });
    const [rentalPrice, setRentalPrice] = useState({ low: 'Min', high: 'Max' });
    const [squareFeet, setSquareFeet] = useState({ low: 'Min', high: 'Max' });
    const [beds, setBeds] = useState({ low: 'Min', high: 'Max' });
    const [baths, setBaths] = useState({ low: 'Min', high: 'Max' });
    const [yearBuilt, setYearBuilt] = useState({ low: 'Min', high: 'Max' });

    const [onMarket, setOnMarket] = useState(daysOnMarketOptions[0]);
    const [priceReduced, setPriceReduced] = useState(priceReducedOptions[0]);

    const handleCloseOpen = () => {
        if (!isOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }

    const setFilters = async () => {
        const body = {};
        const filters = ['Bathrooms', 'Beds', 'Price', 'SqFt', 'YearBuilt'];
        for (let i = 0; i < filters.length; i++) {
            getFilterData(filters[i], body);
        }

        setReqBody({
            ...reqBody,
            ...body
        });

        handleCloseOpen()
    }

    const getFilterData = (filterName, body) => {
        switch (filterName) {
            case 'Bathrooms':
                getDetail(filterName, baths, body);
                break;
            case 'Beds':
                getDetail(filterName, beds, body);
                break;
            case 'Price':
                getDetail(filterName, listPrice, body);
                break;
            case 'SqFt':
                getDetail(filterName, squareFeet, body);
                break;
            case 'YearBuilt':
                getDetail(filterName, yearBuilt, body);
                break;
            default:
                return;
        }
    }
    const getDetail = (filterName, filter, body) => {
        if (filter.low !== 'Min' && /^\d+$/.test(filter.low)) {
            body[filterName + 'Low'] = parseInt(filter.low);
        } else {
            body[filterName + 'Low'] = 0;
        }
        if (filter.high !== 'Max' && /^\d+$/.test(filter.high)) {
            body[filterName + 'High'] = parseInt(filter.high);
        } else {
            body[filterName + 'High'] = 100000000
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
                    {/* <LowHighFilter item={offerPrice} setItem={setOfferPrice} name="Offer Price" type="$" />
                    <LowHighFilter item={rentalPrice} setItem={setRentalPrice} name="Rental Price" type="$" /> */}
                    <LowHighFilter item={squareFeet} setItem={setSquareFeet} name="Square Feet" type="ft" />
                    <LowHighFilter item={beds} setItem={setBeds} name="Beds" type="" />
                    <LowHighFilter item={baths} setItem={setBaths} name="Baths" type="" />
                    <LowHighFilter item={yearBuilt} setItem={setYearBuilt} name="Year Built" type="year" />

                    {/* <DropdownFilter item={onMarket} setItem={setOnMarket} itemOptions={daysOnMarketOptions} name="Days on Market" />
                <DropdownFilter item={priceReduced} setItem={setPriceReduced} itemOptions={priceReducedOptions} name="Price Reduced" /> */}

                    <button className="filter-type-done" onClick={() => setFilters()}>Set filters</button>
                    {/* <button className="filter-type-done filter-more-trans" onClick={() => handleCloseOpen()}>Load previous filters</button> */}
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