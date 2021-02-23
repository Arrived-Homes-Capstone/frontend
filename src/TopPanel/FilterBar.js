import React, {useState, useRef, useEffect} from 'react';
import SortBy from './SortBy';
import HouseType from './HouseType';
import MoreFilters from './MoreFilters';
import Select from "react-dropdown-select";
import '../styles.css';
import zipcodes from '../assets/zipcodes';

const FilterBar = ({ zipcode, setZipcode }) => {
    const [sortType, setSortType] = useState('relevant');

    // https://www.npmjs.com/package/react-dropdown-select
    // Example: https://sanusart.github.io/react-dropdown-select/
    const selectStyle = {
        width: 360,
        height: 28,
        borderColor: '#333333',
        borderRadius: 4,
        paddingLeft: 36,
        color: '#333333',
        fontSize: 18,
        backgroundColor: 'white',
    }

    return (
        <div className="filter-container">
            
            {/* Text Input */}
            <div className="flex-row">
                <div className="flex-row">
                    <img src={'/images/search.png'} className="filter-search" alt="search"  />
                    <Select 
                        options={zipcodes}
                        values={[zipcode]}
                        onChange={(zip) => setZipcode(zip[0].label)}
                        style={selectStyle}
                        closeOnSelect={true}
                    />
                </div>

                <HouseType />

                <MoreFilters />
                
            </div>
            
            <SortBy sortType={sortType} setSortType={setSortType} />
        </div>
    );
};

export default FilterBar;