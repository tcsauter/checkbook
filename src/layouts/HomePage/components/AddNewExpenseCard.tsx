import React, {useEffect, useState} from "react";
import AccountModel from "../../../models/AccountModel";
import {setInitialDateValue} from "../../../utils/dateUtils";
import {Link, useRouteLoaderData, useSubmit} from "react-router-dom";


export const AddNewExpenseCard = () => {
    const { accounts } = useRouteLoaderData("root") as { accounts: AccountModel[] };
    const submit = useSubmit();

    const [inputAmt, setInputAmt] = useState('');
    const [inputAcct, setInputAcct] = useState('');
    const [inputDate, setInputDate] = useState('');
    const [showFormIncompleteMsg, setShowFormIncompleteMsg] = useState(false);

    useEffect(() => {
        setInputDate(setInitialDateValue);
    }, [])

    function handleSubmit() {
        const searchResult = accounts.map(acct => acct.name).findIndex(value => value === inputAcct);
        const canAcceptForm: boolean = searchResult > -1 &&
            inputAmt !== '' &&
            inputDate !== '' && new Date(inputDate).toString() !== 'Invalid Date'

        if (canAcceptForm) {
            const formData = new FormData();
            formData.append("intent", "addExpense")
            formData.append("newExpenseAmt", inputAmt);
            formData.append("newExpenseAcct", accounts[searchResult].id);
            formData.append("newExpenseDate", inputDate);
            submit(formData, { method: "post" })

            setShowFormIncompleteMsg(false);
            setInputDate(setInitialDateValue());
            setInputAmt('');
            setInputAcct('');
        } else {
            setShowFormIncompleteMsg(true);
        }
    }

    function clearFields() {
        setInputAmt('');
        setInputAcct('');
        setInputDate(setInitialDateValue());
        setShowFormIncompleteMsg(false);
    }

    return (
        <div className="card bg-light text-muted shadow">
            <h5 className="card-title mt-3">Add New Expense</h5>
            <form className="p-3 row justify-content-center">
                <div className="col-lg-auto card-text">
                    <input type="number" className="form-control" id="newExpenseAmtInput" placeholder="Amount" required
                           value={inputAmt}
                           onInput={(event) => setInputAmt(event.currentTarget.value)}
                    />
                </div>

                <div className="col-lg-3 card-text dropdown">
                    <button className="form-control btn btn-outline-secondary dropdown-toggle text-start" type="button"
                            data-bs-toggle="dropdown" >{inputAcct ? inputAcct : "Account"}</button>
                    <ul className="dropdown-menu">
                        {accounts.map(account => {
                            return (
                                <li key={"ane" + account.id}
                                    onClick={() => setInputAcct(account.name)}>
                                    <Link to="" className="dropdown-item" >{account.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className='col-lg-auto card-text'>
                    <input className="form-control" type="date" id="newExpenseDateInput" value={inputDate} required
                           onInput={event => setInputDate(event.currentTarget.value)}
                    />
                </div>
                <input type="button"
                       className='btn bg-black text-bg-primary col-11 col-lg-1 mt-3 mt-lg-0 me-lg-2'
                       value="Add"
                       onClick={() => handleSubmit()}
                />
                <input type="button"
                       className='btn bg-black text-bg-primary col-11 col-lg-1 mt-1 mt-lg-0'
                       value="Cancel"
                       onClick={() => clearFields()}
                />
            </form>
            <small className={showFormIncompleteMsg ? 'text-danger' : 'd-none text-danger'}>Please complete all fields
                to submit.</small>
        </div>
    )
}