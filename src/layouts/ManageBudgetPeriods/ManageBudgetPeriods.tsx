import React from "react";

export const ManageBudgetPeriods: React.FC = () => {
    return (
        <div className="container bg-black min-vh-100 bg-opacity-75">
            <div className="card bg-light text-muted shadow">
                <h5 className="card-title mt-3">Add New Budget Periods</h5>
                <div className="card-body d-grid">
                    <form className="row g-3">
                        <div className="col-lg-3">
                            <label htmlFor="inputPayDate" className="form-label card-text">Pay Date</label>
                            <input type="date" className="form-control card-text" id="inputPayDate"/>
                        </div>
                        <div className="col-lg-3">
                            <p className="card-text form-label">Budget Period Begins</p>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="radioBudgetStart"
                                       id="radioBudgetStart1" checked/>
                                <label className="form-check-label" htmlFor="radioBudgetStart1">on Pay Day</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="radioBudgetStart"
                                       id="radioBudgetStart2"/>
                                <label className="form-check-label" htmlFor="radioBudgetStart2">on the day before Pay
                                    Day</label>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <label htmlFor="inputNumberOfDays" className="form-label card-text">And Goes On For</label>
                            <div className="input-group">
                                <input type="number" className="form-control card-text" id="inputNumberOfDays"/>
                                <span className="card-text input-group-text border-0">days</span>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <label htmlFor="inputInitialAmt" className="form-label card-text">Amount Available to
                                Spend</label>
                            <div className="input-group">
                                <span className="card-text input-group-text">$</span>
                                <input type="number" className="form-control card-text" id="inputInitialAmt"/>
                            </div>
                        </div>
                        <div className="col-lg-12 row g-3">
                            <p className="card-text form-label col-lg-3">Create Budget Periods for</p>
                            <div className="form-check col-lg-2">
                                <input className="form-check-input" type="radio" name="radioNumberBPs"
                                       id="radioNumberBPsMonth"/>
                                <label className="form-check-label" htmlFor="radioNumberBPsMonth">the month</label>
                            </div>
                            <div className="form-check col-lg-2">
                                <input className="form-check-input" type="radio" name="radioNumberBPs"
                                       id="radioNumberBPsQuarter"/>
                                <label className="form-check-label" htmlFor="radioNumberBPsQuarter">the quarter</label>
                            </div>
                            <div className="form-check col-lg-2">
                                <input className="form-check-input" type="radio" name="radioNumberBPs"
                                       id="radioNumberBPsYear"/>
                                <label className="form-check-label" htmlFor="radioNumberBPsYear">the year</label>
                            </div>
                            <div className="form-check col-lg-2">
                                <input className="form-check-input" type="radio" name="radioNumberBPs"
                                       id="radioNumberBPs1"/>
                                <label className="form-check-label" htmlFor="radioNumberBPs1">just this one</label>
                            </div>
                        </div>
                        {/*<div className="col-lg-5"></div>*/}
                        <div className="col-lg-12">
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}