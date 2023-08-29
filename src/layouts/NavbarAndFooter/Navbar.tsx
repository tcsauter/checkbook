import React, {useEffect, useState} from "react";
import BudgetPeriodModel from "../../models/BudgetPeriodModel";
import {Link, useLoaderData} from "react-router-dom";
import {budgetPeriodStringify} from "../../utils/budgetPeriodUtil";

export const Navbar = () => {
    //todo: move management of selected budget period to HomePage loader/action

    const {budgetPeriods, currentBudgetPeriod} = useLoaderData() as
        { budgetPeriods: BudgetPeriodModel[], currentBudgetPeriod: BudgetPeriodModel | undefined };

    const [selectedBudgetPeriod, setSelectedBudgetPeriod] = useState<BudgetPeriodModel>();
    const [budgetPeriodString, setBudgetPeriodString] = useState("");
    const [activeNav, setActiveNav] = useState("Home")

    useEffect(() => {
        setActiveNav(
            document.URL.includes("manageaccounts") ?
                "Accounts" :
                document.URL.includes("managebudgetperiods") ?
                    "Budget Periods" :
                    document.URL.includes("managebills") ?
                        "Bills" :
                        "Home"
        )
    }, []);

    return (
        <nav className={'navbar navbar-expand-md navbar-dark bg-black'}>
            <div className='container-fluid'>
                <h3 className='navbar-brand'>ChekBüq</h3>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                    <div className='navbar-nav'>
                        <Link
                            to={selectedBudgetPeriod ? `/${selectedBudgetPeriod.budgetStart}/${selectedBudgetPeriod.budgetEnd}` : ""}
                            className={activeNav === "Home" ? "nav-link active" : "nav-link"}
                            aria-current="page"
                            onClick={() => setActiveNav("Home")}
                        >
                            Home
                        </Link>
                        <Link to="/managebills"
                              className={activeNav === "Bills" ? "nav-link active" : "nav-link"}
                              aria-current="page"
                              onClick={() => setActiveNav("Bills")}
                        >
                            Bills
                        </Link>
                        <Link to="/manageaccounts"
                              className={activeNav === "Accounts" ? "nav-link active" : "nav-link"}
                              aria-current="page"
                              onClick={() => setActiveNav("Accounts")}
                        >
                            Accounts
                        </Link>
                        <Link to="/managebudgetperiods"
                              className={activeNav === "Budget Periods" ? "nav-link active" : "nav-link"}
                              aria-current="page"
                              onClick={() => {
                                  setActiveNav("Budget Periods");
                              }}
                        >
                            Budget Periods
                        </Link>
                    </div>
                    <div className="dropstart navbar-nav">
                        <a className={activeNav === "Budget Periods"
                            ?
                            "nav-link active btn btn-link btn-outline-light bg-light text-black disabled"
                            :
                            "nav-link active dropdown-toggle btn btn-link btn-outline-light text-black"}
                           role="button"
                           data-bs-toggle="dropdown" id="budget-periods-dropdown">
                            {budgetPeriodString ? budgetPeriodString : "Budget Period"}
                        </a>
                        <ul className="dropdown-menu">
                            {currentBudgetPeriod && currentBudgetPeriod !== selectedBudgetPeriod ?
                                <>
                                    <li key="nbddcurrentbp"
                                        onClick={() => {
                                            setSelectedBudgetPeriod(currentBudgetPeriod);
                                            setBudgetPeriodString(budgetPeriodStringify(currentBudgetPeriod));
                                            setActiveNav("Home");
                                        }}
                                    >
                                        <Link
                                            to={`/${currentBudgetPeriod.budgetStart}/${currentBudgetPeriod.budgetEnd}`}
                                            className="dropdown-item nav-link text-black m-0">Current Budget
                                            Period</Link>
                                    </li>
                                    <li key="nbddhr-2">
                                        <hr className="dropdown-divider ms-3 me-3"/>
                                    </li>
                                </>
                                :
                                <></>}

                            {
                                budgetPeriods ?
                                    budgetPeriods.map(period => {
                                            return (
                                                <li key={"nbdd" + period.id}
                                                    onClick={() => {
                                                        setSelectedBudgetPeriod(period);
                                                        setBudgetPeriodString(budgetPeriodStringify(period));
                                                        setActiveNav("Home");
                                                    }}
                                                >
                                                    <Link to={`/${period.budgetStart}/${period.budgetEnd}`}
                                                          className="dropdown-item nav-link text-black">
                                                        {budgetPeriodStringify(period)}
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    )
                                    :
                                    <></>
                            }

                            {budgetPeriodString ?
                                <>
                                    <li key="nbddhr-1">
                                        <hr className="dropdown-divider ms-3 me-3"/>
                                    </li>
                                    <li key="nbddclear"
                                        onClick={() => {
                                            setSelectedBudgetPeriod(undefined);
                                            setBudgetPeriodString("");
                                            setActiveNav("Home");
                                        }}
                                    >
                                        <Link to=""
                                              className="dropdown-item nav-link text-black m-0">Clear</Link>
                                    </li>
                                </>
                                :
                                <></>}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>


    );
}