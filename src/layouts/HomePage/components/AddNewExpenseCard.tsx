import React, {useState} from "react";

export const AddNewExpenseCard: React.FC = () => {
    const [inputAmt, setInputAmt] = useState('');
    const [inputAcct, setInputAcct] = useState('')
    const [inputDate, setInputDate] = useState(setInitalDateValue())


    function setInitalDateValue() {
        const date = new Date();
        return date.getFullYear().toString() + "-" +
               date.getMonth().toString().padStart(2, "0") + "-" +
               date.getDay().toString().padStart(2, "0");
    }

    function addExpense(event: React.MouseEvent<HTMLInputElement, MouseEvent> | React.TouchEvent<HTMLInputElement>) {

    }

    function clearFields(event: React.MouseEvent<HTMLInputElement, MouseEvent> | React.TouchEvent<HTMLInputElement>) {
        setInputAmt('');
        setInputAcct('');
        setInputDate(setInitalDateValue());
    }

    return(
        <div className="card bg-light text-muted shadow">
            <h4 className="card-title mt-3">Add New Expense</h4>
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
                        <option value="Bank of America Checking"/>
                        <option value="Bank of America Credit"/>
                    </datalist>
                </div>
                <div className='col-lg-auto card-text'>
                    <input className="form-control" type="date" id="newExpenseDateInput" value={inputDate}
                           onInput={event => setInputDate(event.currentTarget.value)}
                    />
                </div>
                <input type="button"
                       className='btn bg-black text-bg-primary col-11 col-lg-1 mt-3 mt-lg-0 me-lg-2'
                       value="Add"
                       onClick={event => addExpense(event)}
                       onTouchEnd={event => addExpense(event)}
                />
                <input type="button"
                       className='btn bg-black text-bg-primary col-11 col-lg-1 mt-1 mt-lg-0'
                       value="Cancel"
                       onClick={event => clearFields(event)}
                       onTouchEnd={event => clearFields(event)}
                />
            </form>
        </div>
    )
}