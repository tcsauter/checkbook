import React, {useEffect, useState} from "react";
import BudgetPeriodModel from "../../models/BudgetPeriodModel";

export const Navbar: React.FC<{
    budgetPeriodsArray?: BudgetPeriodModel[],
    setBudgetPeriod: React.Dispatch<React.SetStateAction<BudgetPeriodModel | undefined>>,
    currBudgetPeriod?: BudgetPeriodModel
}> = (props) => {
    const [budgetPeriodString, setBudgetPeriodString] = useState("");

    useEffect(() => {
        setBudgetPeriodString(props.currBudgetPeriod ? budgetPeriodStringify(props.currBudgetPeriod) : "");
    }, [props.currBudgetPeriod])

    function budgetPeriodStringify(bp: BudgetPeriodModel){
        return(
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
        <nav className={'navbar navbar-expand navbar-dark bg-black'}>
            <div className='container-fluid'>
                <h3 className='navbar-brand'>ChekBüq</h3>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                    <div className='navbar-nav'>
                        <a className='nav-link active' aria-current='page' href='#'>Home</a>
                        <a className='nav-link' href='#'>Bills</a>
                    </div>
                    <div className="dropstart navbar-nav">
                        <a className="nav-link active dropdown-toggle" role="button"
                           data-bs-toggle="dropdown">
                            {budgetPeriodString ? budgetPeriodString : "Budget Period"}
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            {
                                props.budgetPeriodsArray ?
                                    props.budgetPeriodsArray.map(period => {
                                            return (
                                                <li key={"nbdd" + period.id}
                                                    onClick={() => {
                                                        props.setBudgetPeriod(period);
                                                    }}
                                                >
                                                    <a className="dropdown-item nav-link"
                                                       href="#">{budgetPeriodStringify(period)}</a>
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
                                        <hr className="dropdown-divider border-dark ms-3 me-3"/>
                                    </li>
                                    <li key="nbddclear"
                                        onClick={() => {
                                            props.setBudgetPeriod(undefined);
                                        }}
                                    >
                                        <a className="dropdown-item nav-link">Clear</a>
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