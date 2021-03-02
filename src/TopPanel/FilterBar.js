import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import SortBy from './SortBy';
import HouseType from './HouseType';
import MoreFilters from './MoreFilters';
import Select from "react-dropdown-select";
import '../styles.css';
import locations from '../assets/addresses';

const FilterBar = ({ address, setAddress, setCenter, houseTypes, setHouseTypes }) => {
    const [sortType, setSortType] = useState('relevant');

    // https://www.npmjs.com/package/react-dropdown-select
    // Example: https://sanusart.github.io/react-dropdown-select/
    const selectStyle = {
        width: 360,
        height: 28,
        borderColor: '#888888',
        borderRadius: 4,
        paddingLeft: 36,
        color: '#333333',
        fontSize: 18,
        backgroundColor: 'white',
    }

  // TODO: Play around with this. Just try to break as much as you can. There is some weird bug going on.
  const handleAddress = (addr) => {
    console.log(addr);
    if (addr === undefined || addr === null || addr.length == 0) {
      setAddress(null);
    } else {
      setAddress(addr);
      setCenter(addr[0].geoLocation);
    }
  } 

    return (
        <div className="filter-container">
            
            {/* Text Input */}
            <div className="flex-row">
                <div className="flex-row">
                    <img src={'/images/search.png'} className="filter-search" alt="search"  />
                    <StyledSelect 
                        options={locations}
                        values={[address]}
                        onChange={(addr) => handleAddress(addr)}
                        style={selectStyle}
                        closeOnSelect={true}
                    />
                </div>

                <HouseType {...{houseTypes, setHouseTypes}}/>

                <MoreFilters />
                
            </div>
            
            <SortBy sortType={sortType} setSortType={setSortType} />
        </div>
    );
};

// https://github.com/sanusart/react-dropdown-select/blob/master/docs/src/examples/Styled.js
const StyledSelect = styled(Select)`
    
  .react-dropdown-select-clear,
  .react-dropdown-select-dropdown-handle {
    color: #888;
  }
  .react-dropdown-select-option {
    border: 1px solid #fff;
  }
  .react-dropdown-select-item {
    color: #333;
  }
  .react-dropdown-select-input {
    color: #333;
  }
  .react-dropdown-select-dropdown {
    position: absolute;
    left: 0;
    border: solid;
    border-color: transparent;
    border-radius: 4px;
    width: 360px;
    padding: 0;
    display: flex;
    flex-direction: column;
    max-height: 300px;
    overflow: auto;
    z-index: 9;
    background: #fff;
    color: #333 !important;

    -webkit-box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
  .react-dropdown-select-item {
    color: #333;
    :hover {
       background-color: #d9ddff;
    }
  }
  .react-dropdown-select-item.react-dropdown-select-item-selected,
  .react-dropdown-select-item.react-dropdown-select-item-active {
    color: #fff;
    background: #818cdc;
  }
  .react-dropdown-select-item.react-dropdown-select-item-disabled {
    background: #818cdc;
    color: #ccc;
  }
`;

export default FilterBar;