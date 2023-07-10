import React, {useEffect, useState} from "react";
import BudgetPeriodModel from "../../models/BudgetPeriodModel";
import {Link} from "react-router-dom";

export const Navbar: React.FC<{
    budgetPeriodsArray?: BudgetPeriodModel[],
    setBudgetPeriod: React.Dispatch<React.SetStateAction<BudgetPeriodModel | undefined>>,
    budgetPeriodsError: boolean,
    currBudgetPeriod?: BudgetPeriodModel
}> = (props) => {
    const [budgetPeriodString, setBudgetPeriodString] = useState("");
    const [activeNav, setActiveNav] = useState("Home")

    useEffect(() => {
        setActiveNav(
            document.URL.includes("managebudgetperiods") ?
                "Budget Periods" :
                "Home"
        )
    }, []);

    useEffect(() => {
        setBudgetPeriodString(props.currBudgetPeriod ? budgetPeriodStringify(props.currBudgetPeriod) : "");
    }, [props.currBudgetPeriod])

    useEffect(() => {
        if (props.budgetPeriodsError) {
            document.getElementById("budget-periods-dropdown")?.setAttribute("disabled", "");
        } else {
            document.getElementById("budget-periods-dropdown")?.removeAttribute("disabled");
        }
    }, [props.budgetPeriodsError])

    function budgetPeriodStringify(bp: BudgetPeriodModel) {
        return (
            new Date(bp.budgetStart).toLocaleDateString("en-US", {
                timeZone: "UTC",
                year: undefined,
                month: "short",
                day: "numeric"
            }) +
            " to " +
            new Date(bp.budgetEnd).toLocaleDateString("en-US", {
                timeZone: "UTC",
                year: "numeric",
                month: "short",
                day: "numeric"
            })
        );
    }

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
                                  props.setBudgetPeriod(undefined); //todo: take this out once loading expenses on nav issue is resolved
                              }}
                        >
                            Budget Periods
                        </Link>
                    </div>
                    <div className="dropstart navbar-nav">
                        <a className="nav-link active dropdown-toggle btn btn-link btn-outline-light text-black"
                           role="button"
                           data-bs-toggle="dropdown" id="budget-periods-dropdown">
                            {budgetPeriodString ? budgetPeriodString : props.budgetPeriodsError ? "Can't Fetch Budget Periods" : "Budget Period"}
                        </a>
                        <ul className="dropdown-menu">
                            {
                                props.budgetPeriodsArray ?
                                    props.budgetPeriodsArray.map(period => {
                                            return (
                                                <li key={"nbdd" + period.id}
                                                    onClick={() => {
                                                        props.setBudgetPeriod(period);
                                                    }}
                                                >
                                                    <Link to="" className="dropdown-item nav-link text-black">
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
                                            props.setBudgetPeriod(undefined);
                                        }}
                                    >
                                        <Link to="" className="dropdown-item nav-link text-black m-0">Clear</Link>
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