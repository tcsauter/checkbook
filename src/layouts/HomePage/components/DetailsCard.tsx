import React, {useState} from "react";
import {ExpenseListItem} from "./ExpenseListItem";
import ExpenseModel from "../../../models/ExpenseModel";
import AccountModel from "../../../models/AccountModel";
import {useLoaderData, useRouteLoaderData, useSubmit} from "react-router-dom";
import {getAccountNameById} from "../../../utils/accountUtil";

export const DetailsCard = () => {
    const { expenses} = useLoaderData() as { expenses: ExpenseModel[] };
    const { accounts } = useRouteLoaderData("root") as { accounts: AccountModel[] };
    const submit = useSubmit();

    const [acctFilter, setAcctFilter] = useState('');
    const [clearBtnClickedOnce, setClearBtnClickedOnce] = useState(false);

    function handleClearExpenses() {
        const formData = new FormData();
        formData.append("intent", "clearExpenses");

        submit(formData, { method: "delete" });
    }

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
                        {accounts.map(account => {
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
                    {expenses.filter((expense: ExpenseModel) => {
                        if (acctFilter !== '') {
                            //get acct object for expense
                            const acct = accounts[accounts.findIndex(acct => acct.id === expense.accountId)];

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
                                                     acctName={getAccountNameById(accounts, expense.accountId)}
                                                     key={expense.id}
                            />);
                        })}
                </ul>
                <input type="button"
                       value={clearBtnClickedOnce ? "Confirm Clear" : "Clear Expenses"}
                       className={clearBtnClickedOnce ? "btn btn-danger mt-3" : "btn btn-outline-warning mt-3"}
                       onClick={async () => {
                           if (clearBtnClickedOnce) {
                               handleClearExpenses();
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