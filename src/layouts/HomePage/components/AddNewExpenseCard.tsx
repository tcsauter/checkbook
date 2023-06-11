import React, {useEffect, useState} from "react";
import ExpenseModel from "../../../models/ExpenseModel";
import AccountModel from "../../../models/AccountModel";

function setInitalDateValue() {
    const date = new Date();
    return date.getFullYear().toString() + "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") + "-" +
        date.getDate().toString().padStart(2, "0");
}

export const AddNewExpenseCard: React.FC<{
    accounts: AccountModel[],
    updateExpenses: (expense: ExpenseModel) => void
}> = (props) => {
    const [inputAmt, setInputAmt] = useState('');
    const [inputAcct, setInputAcct] = useState('');
    const [showInputAcctMsg, setShowInputAcctMsg] = useState(false);
    const [inputDate, setInputDate] = useState('');
    const [showFormIncompleteMsg, setShowFormIncompleteMsg] = useState(false);

    useEffect(() => {
        setInputDate(setInitalDateValue);
    }, [])

    function addExpense() {
        const searchResult = props.accounts.map(acct => acct.name).findIndex(value => value === inputAcct);
        const canAcceptForm: boolean = searchResult > -1 &&
            inputAmt !== '' &&
            inputDate !== '' && new Date(inputDate).toString() !== 'Invalid Date'

        if(canAcceptForm){
            props.updateExpenses({
                id: Date.now().toString(), //this creates a string representation of the current moment, which should ensure a unique id
                amount: Number(inputAmt),
                accountId: props.accounts[searchResult].id,
                date: inputDate
            });

            setShowInputAcctMsg(false);
            setShowFormIncompleteMsg(false);
            setInputDate(setInitalDateValue());
            setInputAmt('');
            setInputAcct('');
        }else{
            if(searchResult === -1) {
                setShowInputAcctMsg(true);
            }else {
                setShowFormIncompleteMsg(true);
            }
        }
    }

    function clearFields() {
        setInputAmt('');
        setInputAcct('');
        setInputDate(setInitalDateValue());
        setShowInputAcctMsg(false);
        setShowFormIncompleteMsg(false);
    }

    return(
        <div className="card bg-light text-muted shadow">
            <h5 className="card-title mt-3">Add New Expense</h5>
            <form className="p-3 row justify-content-center">
                <div className="col-lg-auto card-text">
                    <input type="number" className="form-control" id="newExpenseAmtInput" placeholder="Amount" required
                           value={inputAmt}
                           onInput={(event) => setInputAmt(event.currentTarget.value)}
                    />
                </div>
                <div className="col-lg-auto card-text">
                    <input className="form-control" list="datalistAccounts" id="newExpenseAcctInput" placeholder="Account" required
                           value={inputAcct}
                           onInput={event => setInputAcct(event.currentTarget.value)}
                    />
                    <datalist id="datalistAccounts">
                        {props.accounts.map(acct => <option value={acct.name} key={acct.name} />)}
                    </datalist>
                    <small className={showInputAcctMsg ? 'text-danger' : "d-none text-danger"}>Account entered is not in list</small>
                </div>
                <div className='col-lg-auto card-text'>
                    <input className="form-control" type="date" id="newExpenseDateInput" value={inputDate} required
                           onInput={event => setInputDate(event.currentTarget.value)}
                    />
                </div>
                <input type="button"
                       className='btn bg-black text-bg-primary col-11 col-lg-1 mt-3 mt-lg-0 me-lg-2'
                       value="Add"
                       onClick={() => addExpense()}
                />
                <input type="button"
                       className='btn bg-black text-bg-primary col-11 col-lg-1 mt-1 mt-lg-0'
                       value="Cancel"
                       onClick={() => clearFields()}
                />
            </form>
            <small className={showFormIncompleteMsg ? 'text-danger' : 'd-none text-danger'}>Please complete all fields to submit.</small>
        </div>
    )
}