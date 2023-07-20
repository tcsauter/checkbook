import React, {useEffect, useState} from "react";
import BudgetPeriodModel from "../../models/BudgetPeriodModel";
import {Link, useLoaderData} from "react-router-dom";
import {budgetPeriodStringify} from "../../utils/budgetPeriodUtil";

export const Navbar = () => {
    const [budgetPeriodString, setBudgetPeriodString] = useState("");
    const [activeNav, setActiveNav] = useState("Home")

    const { budgetPeriods, budgetPeriod } = useLoaderData() as { budgetPeriods: BudgetPeriodModel[], budgetPeriod: BudgetPeriodModel | undefined };

    useEffect(() => {
        setActiveNav(
            document.URL.includes("managebudgetperiods") ?
                "Budget Periods" :
                "Home"
        )
    }, []);

    useEffect(() => {
        setBudgetPeriodString(budgetPeriod ? budgetPeriodStringify(budgetPeriod) : "");
    }, [budgetPeriod])

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
                        <Link to="/" className={activeNav === "Home" ? "nav-link active" : "nav-link"}
                              aria-current="page"
                              onClick={() => setActiveNav("Home")}
                        >
                            Home
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
                        <a className={activeNav==="Budget Periods"
                            ?
                            "nav-link active btn btn-link btn-outline-light bg-light text-black disabled"
                            :
                            "nav-link active dropdown-toggle btn btn-link btn-outline-light text-black"}
                           role="button"
                           data-bs-toggle="dropdown" id="budget-periods-dropdown">
                            {budgetPeriodString ? budgetPeriodString : "Budget Period"}
                        </a>
                        <ul className="dropdown-menu">
                            {
                                budgetPeriods ?
                                    budgetPeriods.map(period => {
                                            return (
                                                <li key={"nbdd" + period.id}
                                                    onClick={() => {
                                                        setBudgetPeriodString(budgetPeriodStringify(period));
                                                    }}
                                                >
                                                    <Link to={`/expenses/${period.budgetStart}/${period.budgetEnd}`} className="dropdown-item nav-link text-black">
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
                                            setBudgetPeriodString("");
                                        }}
                                    >
                                        <Link to="/expenses" className="dropdown-item nav-link text-black m-0">Clear</Link>
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