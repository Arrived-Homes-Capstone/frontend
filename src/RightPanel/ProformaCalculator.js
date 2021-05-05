import React, { useState, useEffect } from 'react';
import { getProformaCalcs } from '../API/functions';
import ProformaConstant from './ProformaConstant';
const formatter = Intl.NumberFormat();

// REMOVE
// interest rate
// loan fees
// offering expenses
// property management %
// Turns/year
// Year 1 override appreciation

// INCLUDE
// Rent/month $
// Purchase price $
// HOA Fee/month $

//CHANGE
// Reno budget % -> Reno budget $
// Tax -> Tax/yr $


const ProformaCalculator = ({ property }) => {
    const [isLoading, setIsLoading] = useState(true);
    // Constants
    const [rent, setRent] = useState(null);
    const [purchase, setPurchase] = useState(null);
    const [hoa, setHoa] = useState(null);
    const [markup, setMarkup] = useState(null);
    const [rate, setRate] = useState(null);
    const [fees, setFees] = useState(null);
    const [maintanence, setMaintenance] = useState(null);
    const [reno, setReno] = useState(null);
    const [tax, setTax] = useState(null);
    const [vacancy, setVacancy] = useState(null);


    // Results
    const [IER, setIER] = useState(null);
    const [IRR, setIRR] = useState(null);
    const [Yield, setYield] = useState(null);
    const [Upfront, setUpfront] = useState(null);
    const [AUM, setAUM] = useState(null);

    useEffect(() => {
        if (property) {
            const { ProformaData } = property;
            const { Constants } = ProformaData;
            setPurchase(property["ListPrice"]);
            setRent(property["RentLow"]);
            setHoa(property["HOAFee"]);
            setMarkup(Constants["Arrived Markup"]);
            setRate(Constants["Interest Rate"]);
            setFees(Constants["Loan Fees"]);
            setMaintenance(Constants["Maintenance %"]);
            setReno(2000);
            setTax(Constants["Tax"]);
            setVacancy(Constants["Vacancy %"]);


            setIER(property.ProformaData.InvestorEquityRequired)
            setIRR(property.ProformaData.InvestorIRR)
            setYield(property.ProformaData.InvestorYield)
            setUpfront(property.ProformaData.ArrivedUpfrontRevenue)
            setAUM(property.ProformaData.ArrivedPropertyAUMFees)
            setIsLoading(false);
        }
    }, [property]);

    // Send a request with the updated constants based on this calculator tool
    const handleSubmit = async () => {
        const body = {
            ListPrice: parseFloat(purchase),
            RenoBudget: property.RenovationPrice,
            HOAFee: parseFloat(hoa || 0),
            PropertyTax: property.ProformaData.Constants.Tax,
            Rent: parseFloat(rent),
            RenoBudget: parseFloat(reno),
        }

        const Constants = {
            "Arrived Markup": parseFloat(markup),
            "Interest Rate": parseFloat(rate),
            "Loan Fees": parseFloat(fees),
            "Maintenance %": parseFloat(maintanence),
            "Tax": parseFloat(tax),
            "Vacancy %": parseFloat(vacancy),
        };

        body.Constants = Constants;

        console.log(body);

        const res = await getProformaCalcs(body);
        console.log(res);
        setIER(res.InvestorEquityRequired)
        setIRR(res.InvestorIRR)
        setYield(res.InvestorYield)
        setUpfront(res.ArrivedUpfrontRevenue)
        setAUM(res.ArrivedPropertyAUMFees)
    }

    // Fill all of the proforma constants with their original values when starting the calculator
    // Essentially resetting the entire state to what it was when opening the calculator
    const handleReset = () => {
        const { ProformaData } = property;
        const { Constants } = ProformaData;
        setMarkup(Constants["Arrived Markup"]);
        setHoa(property["HOAFee"]);
        setRent(property["RentLow"]);
        setPurchase(property["ListPrice"]);
        setRate(Constants["Interest Rate"]);
        setFees(Constants["Loan Fees"]);
        setMaintenance(Constants["Maintenance %"]);
        setReno(2000);
        setTax(Constants["Tax"]);
        setVacancy(Constants["Vacancy %"]);
    }

    if (isLoading) {
        return <p>Loading</p>
    } else {
        return (
            <>
                <p className="proformaCalcTitle">Proforma Calculator</p>
                <div className="flex-row" style={{ alignItems: 'flex-start' }}>
                    <div className="proformaCol1">
                        <ProformaConstant value={purchase} setValue={setPurchase} name={"Purchase Price $"} />
                        <ProformaConstant value={rent} setValue={setRent} name={"Rent/month $"} />
                        <ProformaConstant value={hoa} setValue={setHoa} name={"HOA/month $"} />
                        <ProformaConstant value={markup} setValue={setMarkup} name={"Arrived Markup"} />
                        <ProformaConstant value={maintanence} setValue={setMaintenance} name={"Maintenance %"} />
                    </div>
                    <div className="proformaCol1">
                        <ProformaConstant value={reno} setValue={setReno} name={"Reno budget $"} />
                        <ProformaConstant value={tax} setValue={setTax} name={"Tax/yr $"} />
                        <ProformaConstant value={vacancy} setValue={setVacancy} name={"Vacancy %"} />
                        <ProformaConstant value={rate} setValue={setRate} name={"Interest Rate"} />
                        <ProformaConstant value={fees} setValue={setFees} name={"Loan Fees"} />
                    </div>
                    <div className="flex-column" style={{ width: '60%', justifyContent: 'space-between', alignItems: 'center', paddingRight: 48 }}>
                        <div className="flex-row" style={{ justifyContent: 'space-evenly' }}>
                            <div>
                                <p>Investor Equity Required</p>
                                <p>Investor IRR (Year 7)</p>
                                <p>Investor Yield (Year 1)</p>
                                <p>Arrived Upfront Revenue</p>
                                <p>Arrived Property AUM Fees (7 yr)</p>
                            </div>
                            <div className="proformaCol3">
                                <p>${formatter.format(Math.round(IER))}</p>
                                <p>{Math.round(IRR * 10000) / 100}%</p>
                                <p>{Math.round(Yield * 10000) / 100}%</p>
                                <p>${formatter.format(Math.round(Upfront))}</p>
                                <p>${formatter.format(Math.round(AUM))}</p>
                            </div>
                        </div>
                        <div className="flex-column">
                            <button className="filter-type-done" onClick={() => handleSubmit()}>Update Proforma Constants</button>
                            <button className="filter-type-done proformaButtonTrans" onClick={() => handleReset()}>Reset Proforma</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default ProformaCalculator;