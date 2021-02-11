import React, {useState, useRef, useEffect} from 'react';
import SortBy from './SortBy';
import PropTypes from 'prop-types';
import '../styles.css';

const FilterBar = () => {
    const [sortType, setSortType] = useState('relevant');

    return (
        <div className="filter-container">
            
            {/* Text Input */}
            <div className="filter-input-container">
                <img src={'/images/search.png'} className="filter-search" alt="search"  />
                <input type="text" className="filter-input"/>
            </div>

            {/* Sort By */}
            <SortBy sortType={sortType} setSortType={setSortType} />
        </div>
    );
};

FilterBar.propTypes = {
    
};

export default FilterBar;