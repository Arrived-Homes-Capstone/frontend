import React, { useState } from 'react';
import styled from '@emotion/styled';
import Select from "react-dropdown-select";
import '../styles.css';

const DropdownFilter = ({ item, setItem, itemOptions, name }) => {
    // https://www.npmjs.com/package/react-dropdown-select
    // Example: https://sanusart.github.io/react-dropdown-select/
    const selectStyle = {
        width: 220,
        height: 1,
        borderColor: '#888888',
        borderRadius: 4,
        paddingLeft: 20,
        marginTop: 4,
        color: '#888888',
        fontSize: 12,
        backgroundColor: 'white',
        outline: 'none',
    }

    const [isVisible, setIsVisible] = useState(true);

    const handleChange = (e) => {
        if (e === undefined || e === null || e.length == 0) {
            setItem(itemOptions[0]);
        } else {
            setItem(e[0]);
        }
    }

    // If this is a component that needs a "yes or no" state
    const renderCheckbox = () => {
        if (name === 'Price Reduced') {
            return (
                <button className="dropdown-btn" onClick={() => handleClick()}>
                { isVisible
                ? <img src={'/images/check_clicked.png'} alt="checkbox empty" className="dropdown-check" />
                : <img src={'/images/check_empty.png'} alt="checkbox empty" className="dropdown-check" />
                }
            </button>
            )
        }
    }

    // Sets the Priced Reduced to null and hides the select component
    const handleClick = () => {
        setItem({ value: null, label: null });
        setIsVisible(!isVisible);
    }

    return (
        <div>
            <div className="dropdown-row">
                {renderCheckbox()}
                <p className="low-high-text" style={{marginBottom: 0}}>{name}</p>
            </div>
                
            { isVisible && 
            <StyledSelect
                options={itemOptions}
                values={[item]}
                onChange={(e) => handleChange(e)}
                style={selectStyle}
                closeOnSelect={true}
                dropdownPosition="auto"
            />
            }
        </div>
    );
}

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
    width: 220px;
    padding: 0;
    display: flex;
    flex-direction: column;
    max-height: 200px;
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

export default DropdownFilter;