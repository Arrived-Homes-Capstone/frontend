import React, { useState, useEffect } from 'react';
import { getProformaCalcs } from '../API/functions';
import ProformaConstant from './ProformaConstant';
const formatter = Intl.NumberFormat();

const ProformaCalculator = ({ property }) => {
    const [isLoading, setIsLoading] = useState(true);
    // Constants
    const [markup, setMarkup] = useState(null);
    const [rate, setRate] = useState(null);
    const [fees, setFees] = useState(null);
    const [maintanence, setMaintenance] = useState(null);
    const [offering, setOffering] = useState(null);
    const [manage, setManage] = useState(null);
    const [reno, setReno] = useState(null);
    const [tax, setTax] = useState(null);
    const [turns, setTurns] = useState(null);
    const [vacancy, setVacancy] = useState(null);
    const [override, setOverride] = useState(null);


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
            setMarkup(Constants["Arrived Markup"]);
            setRate(Constants["Interest Rate"]);
            setFees(Constants["Loan Fees"]);
            setMaintenance(Constants["Maintenance %"]);
            setOffering(Constants["Offering Expenses"]);
            setManage(Constants["Property Management %"]);
            setReno(Constants["Reno Budgets as Percent of Aquisition"]);
            setTax(Constants["Tax"]);
            setTurns(Constants["Turns/Year"]);
            setVacancy(Constants["Vacancy %"]);
            setOverride(Constants["Year 1 Override Appreciation"]);


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
            ListPrice: property.ListPrice,
            RenoBudget: property.RenovationPrice,
            HOAFee: property.HOAFee,
            PropertyTax: property.ProformaData.Constants.Tax
        }

        const Constants = {
            "blah": markup
        };

        body.Constants = Constants;
        await getProformaCalcs(body)
    }

    // Fill all of the proforma constants with their original values when starting the calculator
    // Essentially resetting the entire state to what it was when opening the calculator
    const handleReset = () => {

    }

    if (isLoading) {
        return <p>Loading</p>
    } else {
        return (
            <>
                <p className="proformaCalcTitle">Proforma Calculator</p>
                <div className="flex-row" style={{ alignItems: 'flex-start' }}>
                    <div className="proformaCol1">
                        <ProformaConstant value={markup} setValue={setMarkup} name={"Arrived Markup"} />
                        <ProformaConstant value={rate} setValue={setRate} name={"Interest Rate"} />
                        <ProformaConstant value={fees} setValue={setFees} name={"Loan Fees"} />
                        <ProformaConstant value={maintanence} setValue={setMaintenance} name={"Maintenance %"} />
                        <ProformaConstant value={offering} setValue={setOffering} name={"Offering Expenses"} />
                        <ProformaConstant value={manage} setValue={setManage} name={"Property Management %"} />
                    </div>
                    <div className="proformaCol1">
                        <ProformaConstant value={reno} setValue={setReno} name={"Reno Budgets as % of Aquisition"} />
                        <ProformaConstant value={tax} setValue={setTax} name={"Tax"} />
                        <ProformaConstant value={turns} setValue={setTurns} name={"Turns/Year"} />
                        <ProformaConstant value={vacancy} setValue={setVacancy} name={"Vacancy %"} />
                        <ProformaConstant value={override} setValue={setOverride} name={"Year 1 Override Appreciation"} />
                    </div>
                    <div className="flex-col">
                        <div className="flex-row">
                            <div style={{ width: '100' }}>
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