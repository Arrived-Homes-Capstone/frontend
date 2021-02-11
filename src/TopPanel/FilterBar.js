import React, {useState, useRef, useEffect} from 'react';
import SortBy from './SortBy';
import PropTypes from 'prop-types';
import '../styles.css';

const FilterBar = () => {
    const [selectOpen, setSelectOpen] = useState(false);
    //const [selectedSort, setSelectedSort] = useState('chocolate');

    // const handleChange = (selectedOption) => {
    //     setSelectedSort(selectedOption);
    // };

    return (
        <div className="filter-container">
            
            {/* Text Input */}
            <div className="filter-input-container">
                <img src={'/images/search.png'} className="filter-search" alt="search"  />
                <input type="text" className="filter-input"/>
            </div>

            {/* Sort By */}
            <SortBy />
        </div>
    );
};

FilterBar.propTypes = {
    
};

export default FilterBar;