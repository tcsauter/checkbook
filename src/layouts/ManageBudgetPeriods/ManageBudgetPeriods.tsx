import React, {useState} from "react";
import BudgetPeriodModel from "../../models/BudgetPeriodModel";
import {calculateDateReturnString} from "../../utils/dateUtils";
import {addBudgetPeriod, addBudgetPeriodBatch} from "../../utils/budgetPeriodUtil";

export const ManageBudgetPeriods: React.FC<{
    setBudgetPeriods: React.Dispatch<React.SetStateAction<BudgetPeriodModel[] | undefined>>,
    setBudgetPeriodsError: React.Dispatch<React.SetStateAction<boolean>>
}> = (props) => {
    const [inputPayDate, setInputPayDate] = useState("");
    const [budgetStartOption, setBudgetStartOption] = useState("opt1");
    const [inputDaysBefore, setInputDaysBefore] = useState(0);
    const [inputBpLength, setInputBpLength] = useState(0);
    const [inputInitAmt, setInputInitAmt] = useState(0);
    const [howManyOption, setHowManyOption] = useState("opt4");
    const [formValidationError, setFormValidationError] = useState(false);

    function handleFormSubmit() {
        let formIsValidated = false;
        //Ensure required fields are all populated
        if(
            inputPayDate !== "" && (budgetStartOption === "opt1" || budgetStartOption === "opt2") &&
            inputBpLength && inputInitAmt &&
            (howManyOption === "opt1" || howManyOption === "opt2" || howManyOption === "opt3" || howManyOption === "opt4")
        ) {
            if (budgetStartOption === "opt2") {
                formIsValidated = inputDaysBefore !== 0;
            } else {
                formIsValidated = true;
            }
        }

        setFormValidationError(!formIsValidated);

        if(formIsValidated) {
            //normalize numeric data
            if(inputDaysBefore) {
                setInputDaysBefore(Math.floor(Math.abs(inputDaysBefore)));
            }
            setInputBpLength(Math.floor(Math.abs(inputBpLength)));

            //invoke appropriate routine to build budget period object(s) and add to db
            if(howManyOption === "opt4"){
                addBudgetPeriod(buildSingleBudgetPeriodFromInput())
                    .then(response => props.setBudgetPeriods(response))
                    .catch(() => props.setBudgetPeriodsError(true));
            }else{
                addBudgetPeriodBatch(buildGroupOfBudgetPeriodsFromInput())
                    .then(response => props.setBudgetPeriods(response))
                    .catch(() => props.setBudgetPeriodsError(true));
            }

            //clear fields
            setInputPayDate("");
            setBudgetStartOption("opt1");
            setInputDaysBefore(0);
            setInputBpLength(0);
            setInputInitAmt(0);
            setHowManyOption("opt4");
            setFormValidationError(false);
        }
    }

    function buildGroupOfBudgetPeriodsFromInput(): BudgetPeriodModel[] {
        const daysInTimePeriod = howManyOption === "opt1" ? 30 :
            howManyOption === "opt2" ? 90 :
                howManyOption === "opt3" ? 365 : undefined;

        if(daysInTimePeriod){
            const numberOfBps = Math.floor(daysInTimePeriod / inputBpLength);
            const budgetPeriods: BudgetPeriodModel[] = [];
            for(let bp = 0; bp < numberOfBps; bp++) {
                const payDate = calculateDateReturnString(new Date(inputPayDate), (inputBpLength * bp));
                budgetPeriods.push(buildSingleBudgetPeriodFromInput(payDate));
            }
            return budgetPeriods;
        }else{
            return [];
        }
    }

    function buildSingleBudgetPeriodFromInput(payDateArg?: string): BudgetPeriodModel {
        const payDate = payDateArg ? payDateArg : inputPayDate;
        const budgetStart = budgetStartOption === "opt1" ? payDate : calculateDateReturnString(new Date(payDate), (-1 * inputDaysBefore));
        const budgetEnd = calculateDateReturnString(new Date(budgetStart), (inputBpLength - 1));

        return {
            id: Date.now().toString() + payDate, //this creates a string representation of the current moment, which should ensure a unique id + append payDate to ensure uniqueness when created in a loop
            payDate: payDate,
            budgetStart: budgetStart,
            budgetEnd: budgetEnd,
            startingAmt: inputInitAmt
        }
    }

    return (
        <div className="container bg-black min-vh-100 bg-opacity-75">
            <div className="card text-muted shadow">
                <h5 className="card-title mt-3">Add New Budget Periods</h5>
                <div className="card-body d-grid">
                    <form className="row g-3">
                        <div className="col-lg-3">
                            <label htmlFor="inputPayDate" className="form-label card-text">Pay Date</label>
                            <input type="date" className="form-control card-text" id="inputPayDate" required
                                   value={inputPayDate} onInput={event => setInputPayDate(event.currentTarget.value)}
                            />
                        </div>
                        <div className="col-lg-3">
                            <p className="card-text form-label">Budget Period Begins</p>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="radioBudgetStart"
                                       id="radioBudgetStart1" checked={budgetStartOption === "opt1"}
                                       onChange={() => setBudgetStartOption("opt1")}/>
                                <label className="form-check-label" htmlFor="radioBudgetStart1">on Pay Day</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="radioBudgetStart"
                                       id="radioBudgetStart2" checked={budgetStartOption === "opt2"}
                                       onChange={() => setBudgetStartOption("opt2")}/>
                                <label className="form-check-label" htmlFor={"radioBudgetStart2"}>
                                    <div className="input-group">
                                        <input type="number" className="card-text form-control"
                                               value={inputDaysBefore === 0 ? "" : inputDaysBefore}
                                               onInput={event => {
                                                   setInputDaysBefore(Number(event.currentTarget.value));
                                                   setBudgetStartOption("opt2");
                                               }}
                                               required={budgetStartOption === "opt2"}
                                               tabIndex={budgetStartOption === "opt2" ? 0 : -1}
                                        />
                                        <span
                                            className="card-text bg-white input-group-text border-0">day(s) before Pay Day</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <label htmlFor="inputNumberOfDays" className="form-label card-text">And Goes On For</label>
                            <div className="input-group">
                                <input type="number" className="form-control card-text" id="inputNumberOfDays" required
                                       value={inputBpLength === 0 ? "" : inputBpLength}
                                       onInput={event => setInputBpLength(Number(event.currentTarget.value))}
                                />
                                <span className="card-text input-group-text border-0">days</span>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <label htmlFor="inputInitialAmt" className="form-label card-text">Amount Available to
                                Spend</label>
                            <div className="input-group">
                                <span className="card-text input-group-text">$</span>
                                <input type="number" className="form-control card-text" id="inputInitialAmt" required
                                       value={inputInitAmt === 0 ? "" : inputInitAmt}
                                       onInput={event => setInputInitAmt(Number(event.currentTarget.value))}
                                />
                            </div>
                        </div>
                        <div className="col-lg-12 row g-3">
                            <p className="card-text form-label col-lg-3">Create Budget Periods for</p>
                            <div className="form-check col-lg-2">
                                <input className="form-check-input" type="radio" name="radioNumberBPs"
                                       id="radioNumberBPsMonth" checked={howManyOption === "opt1"}
                                       onChange={() => setHowManyOption("opt1")}
                                />
                                <label className="form-check-label" htmlFor="radioNumberBPsMonth">the month</label>
                            </div>
                            <div className="form-check col-lg-2">
                                <input className="form-check-input" type="radio" name="radioNumberBPs"
                                       id="radioNumberBPsQuarter" checked={howManyOption === "opt2"}
                                       onChange={() => setHowManyOption("opt2")}
                                />
                                <label className="form-check-label" htmlFor="radioNumberBPsQuarter">the quarter</label>
                            </div>
                            <div className="form-check col-lg-2">
                                <input className="form-check-input" type="radio" name="radioNumberBPs"
                                       id="radioNumberBPsYear" checked={howManyOption === "opt3"}
                                       onChange={() => setHowManyOption("opt3")}
                                />
                                <label className="form-check-label" htmlFor="radioNumberBPsYear">the year</label>
                            </div>
                            <div className="form-check col-lg-2">
                                <input className="form-check-input" type="radio" name="radioNumberBPs"
                                       id="radioNumberBPs1" checked={howManyOption === "opt4"}
                                       onChange={() => setHowManyOption("opt4")}
                                />
                                <label className="form-check-label" htmlFor="radioNumberBPs1">just this one</label>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <input type="button" className="btn btn-dark" value="Submit"
                                   onClick={() => handleFormSubmit()}
                            />
                        </div>
                    </form>
                    <small className={formValidationError ? "text-danger mt-1" : "d-none text-danger mt-1"}>Please fill in all required fields.</small>
                </div>
            </div>
        </div>
    );
}