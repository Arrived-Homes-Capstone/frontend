import React, { useState, useEffect, useRef } from 'react';
import LowHighFilter from './LowHighFilter';

const ProformaFilters = ({ setReqBody, reqBody }) => {
    const ref = useRef();
    const [isOpen, setIsOpen] = useState(false);
    useOnClickOutside(ref, () => setIsOpen(false));

    const [investorEquity, setInvestorEquity] = useState({ low: 'Min', high: 'Max' });
    const [investorIRR, setInvestorIRR] = useState({ low: 'Min', high: 'Max' });
    const [investorYield, setInvestorYield] = useState({ low: 'Min', high: 'Max' });
    const [arrivedRevenue, setArrivedRevenue] = useState({ low: 'Min', high: 'Max' });
    const [arrivedFees, setArrivedFees] = useState({ low: 'Min', high: 'Max' });

    const handleCloseOpen = () => {
        if (!isOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }

    const setFilters = async () => {
        const body = {};
        const filters = ['InvestorIRR', 'InvestorEquityRequired', 'InvestorYield', 'ArrivedPropertyAUMFees', 'ArrivedUpfrontRevenue'];
        for (let i = 0; i < filters.length; i++) {
            getFilterData(filters[i], body);
        }

        console.log(body);

        // setReqBody({
        //     ...reqBody,
        //     ...body
        // });

        handleCloseOpen()
    }

    const getFilterData = (filterName, body) => {
        switch (filterName) {
            case 'InvestorEquityRequired':
                getDetail(filterName, investorEquity, body);
                break;
            case 'InvestorIRR':
                getDetail(filterName, investorIRR, body);
                break;
            case 'InvestorYield':
                getDetail(filterName, investorYield, body);
                break;
            case 'ArrivedUpfrontRevenue':
                getDetail(filterName, arrivedRevenue, body);
                break;
            case 'ArrivedPropertyAUMFees':
                getDetail(filterName, arrivedFees, body);
                break;
            default:
                return;
        }
    }
    const getDetail = (filterName, filter, body) => {
        if (filter.low !== 'Min' && /^\d+$/.test(filter.low)) {
            body[filterName + 'Low'] = (parseInt(filter.low) / 100);
        } else {
            body[filterName + 'Low'] = null;
        }
        if (filter.high !== 'Max' && /^\d+$/.test(filter.high)) {
            body[filterName + 'High'] = parseInt(filter.high) / 100;
        } else {
            body[filterName + 'High'] = null;
        }
    }

    return (
        <div>
            {/* Button before click */}
            <div className="flex-row">
                {isOpen
                    ?
                    <button className="flex-row filter-type-container filter-more-container filter-more-touch type-pressed" onClick={() => handleCloseOpen()}>
                        <img src={'images/filter_white.png'} alt="filter" className="filter-more-img filter-more-touch" />
                        <p>Proforma</p>
                    </button>
                    :
                    <button className="flex-row filter-type-container filter-more-container" onClick={() => handleCloseOpen()}>
                        <img src={'images/filter_gray.png'} alt="filter" className="filter-more-img" />
                        <p>Proforma</p>
                    </button>
                }
            </div>

            {/* Button after click */}
            { isOpen &&
                <div ref={ref} className="filter-type-options">
                    {/* <LowHighFilter item={investorEquity} setItem={setInvestorEquity} name="Investor Equity" type="$" /> */}
                    <LowHighFilter item={investorIRR} setItem={setInvestorIRR} name="Investor IRR" type="%" />
                    <LowHighFilter item={investorYield} setItem={setInvestorYield} name="Investor Yield" type="%" />
                    {/* <LowHighFilter item={arrivedRevenue} setItem={setArrivedRevenue} name="Arrived Upfront Revenue" type="$" />
                    <LowHighFilter item={arrivedFees} setItem={setArrivedFees} name="Arrived Property Fees" type="$" /> */}

                    <button className="filter-type-done" onClick={() => setFilters()}>Set filters</button>
                </div>
            }
        </div>
    );
};

function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = event => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }

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
        [ref, handler]
    );
}

export default ProformaFilters;