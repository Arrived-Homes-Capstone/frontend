import React, {useState, useRef, useEffect} from 'react';
import SortBy from './SortBy';
import HouseType from './HouseType';
import MoreFilters from './MoreFilters';
import '../styles.css';

const FilterBar = () => {
    const [sortType, setSortType] = useState('relevant');

    return (
        <div className="filter-container">
            
            {/* Text Input */}
            <div className="flex-row">
                <div className="filter-input-container">
                    <img src={'/images/search.png'} className="filter-search" alt="search"  />
                    <input type="text" className="filter-input"/>
                </div>

                <HouseType />

                <MoreFilters />
                
            </div>
            
            <SortBy sortType={sortType} setSortType={setSortType} />
        </div>
    );
};

FilterBar.propTypes = {
    
};

export default FilterBar;