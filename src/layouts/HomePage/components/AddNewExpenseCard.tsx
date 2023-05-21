import React, {useState} from "react";
import ExpenseModel from "../../../models/ExpenseModel";
import AccountModel from "../../../models/AccountModel";

export const AddNewExpenseCard: React.FC<{
    accounts: AccountModel[],
    updateExpenses: (expense: ExpenseModel) => void
}> = (props) => {
    const [inputAmt, setInputAmt] = useState('');
    const [inputAcct, setInputAcct] = useState('');
    const [showInputAcctMsg, setShowInputAcctMsg] = useState(false);
    const [inputDate, setInputDate] = useState(setInitalDateValue());
    const [showFormIncompleteMsg, setShowFormIncompleteMsg] = useState(false);


    function setInitalDateValue() {
        const date = new Date();
        return date.getFullYear().toString() + "-" +
               date.getMonth().toString().padStart(2, "0") + "-" +
               date.getDay().toString().padStart(2, "0");
    }

    function addExpense(event: React.MouseEvent<HTMLInputElement, MouseEvent> | React.TouchEvent<HTMLInputElement>) {
        const searchResult = props.accounts.map(acct => acct.name).findIndex(value => value === inputAcct);
        const canAcceptForm: boolean = searchResult > -1 &&
            inputAmt !== '' &&
            inputDate !== '' && new Date(inputDate).toString() !== 'Invalid Date'

        if(canAcceptForm){
            props.updateExpenses({
                id: 0,
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

    function clearFields(event: React.MouseEvent<HTMLInputElement, MouseEvent> | React.TouchEvent<HTMLInputElement>) {
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
                       onClick={event => addExpense(event)}
                />
                <input type="button"
                       className='btn bg-black text-bg-primary col-11 col-lg-1 mt-1 mt-lg-0'
                       value="Cancel"
                       onClick={event => clearFields(event)}
                />
            </form>
            <small className={showFormIncompleteMsg ? 'text-danger' : 'd-none text-danger'}>Please complete all fields to submit.</small>
        </div>
    )
}