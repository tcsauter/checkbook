import React, {useEffect, useState} from "react";
import {ExpenseListItem} from "./ExpenseListItem";
import {Dropdown} from "bootstrap";
import ExpenseModel from "../../../models/ExpenseModel";
import AccountModel from "../../../models/AccountModel";

export const DetailsCard: React.FC<{
    expenseArray: ExpenseModel[],
    accountsArray: AccountModel[],
    getAccountNameById: (id: string) => string | undefined,
    updateExpense: (expense: ExpenseModel) => Promise<void>,
    deleteExpense: (expenseId: string) => Promise<void>
    clearExpenses: () => void;
}> = (props) => {
    const [acctFilter, setAcctFilter] = useState('');
    const [clearBtnClickedOnce, setClearBtnClickedOnce] = useState(false);
    const [dropdownList, setDropdownList] = useState<Dropdown[]>([]);

    useEffect(() => {
        const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
        setDropdownList([...dropdownElementList].map(dropdownToggleEl => new Dropdown(dropdownToggleEl)));
    }, [])

    return (
        <div className='card bg-light text-muted shadow' id='details-card'>
            <div className='card-body'>
                <h5 className='card-title'>Details</h5>
                <div className='p-3 row justify-content-center dropdown'>
                    <button className='btn btn-outline-secondary dropdown-toggle' type='button'
                            data-bs-toggle="dropdown">
                        {acctFilter ? acctFilter : "Filter by Account"}
                    </button>
                    <ul className="dropdown-menu">
                        <li key="dc-1"
                            onClick={() => setAcctFilter("All Credit Accounts")}
                        >
                            <a className="dropdown-item" href="#">All Credit Accounts</a>
                        </li>
                        <li key={"dc-2"}
                            onClick={() => setAcctFilter("All Cash Accounts")}
                        >
                            <a className="dropdown-item" href="#">All Cash Accounts</a>
                        </li>
                        <li key="dchr-1">
                            <hr className="dropdown-divider ms-3 me-5"/>
                        </li>
                        {props.accountsArray.map(account => {
                            return (
                                <li key={"dc" + account.id}
                                    onClick={() => setAcctFilter(account.name)}
                                >
                                    <a className="dropdown-item" href="#">{account.name}</a>
                                </li>
                            );
                        })}
                        {
                            acctFilter ?
                                <>
                                    <li key="dchr-2">
                                        <hr className="dropdown-divider ms-3 me-5"/>
                                    </li>
                                    <li key="dcclear"
                                        onClick={() => setAcctFilter("")}
                                    >
                                        <a className="dropdown-item" href="#">Clear Filter</a>
                                    </li>
                                </>
                                :
                                <></>
                        }
                    </ul>
                </div>
                <ul className='list-group'>
                    {props.expenseArray.filter((expense: ExpenseModel) => {
                        if (acctFilter !== '') {
                            //get acct object for expense
                            const acct = props.accountsArray[props.accountsArray.findIndex(acct => acct.id === expense.accountId)];

                            if (acctFilter === 'All Credit Accounts') {
                                return acct.type === 'Credit';
                            } else if (acctFilter === 'All Cash Accounts') {
                                return acct.type === 'Cash';
                            } else {
                                return acctFilter === acct.name;
                            }
                        } else {
                            return true;
                        }
                    })
                        .map((expense: ExpenseModel) => {
                            return (<ExpenseListItem expense={expense}
                                                     updateExpense={props.updateExpense}
                                                     deleteExpense={props.deleteExpense}
                                                     acctName={props.getAccountNameById(expense.accountId)}
                                                     key={expense.id}
                            />);
                        })}
                </ul>
                <input type="button"
                       value={clearBtnClickedOnce ? "Confirm Clear" : "Clear Expenses"}
                       className={clearBtnClickedOnce ? "btn btn-danger mt-3" : "btn btn-outline-warning mt-3"}
                       onClick={() => {
                           if (clearBtnClickedOnce) {
                               props.clearExpenses();
                               setClearBtnClickedOnce(false);
                           } else {
                               setClearBtnClickedOnce(true);
                           }
                       }}
                />
            </div>
        </div>
    );
}