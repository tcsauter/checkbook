import React, {useState} from "react";
import ExpenseModel from "../../../models/ExpenseModel";

export const ExpenseListItem: React.FC<{
    expense: ExpenseModel,
    updateExpense: (newExpense: ExpenseModel) => void,
    getAcctNameById: (id: number) => string | undefined
}> = (props) => {
    const [showAmtInput, setShowAmtInput] = useState(false);
    const [showAmtWarning, setShowAmtWarning] = useState(false);
    const [amtInputValue, setAmtInputValue] = useState('');

    function processAmtInput(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            const amtInput = Number(amtInputValue);

            if (isNaN(Number(amtInput))) {
                setShowAmtWarning(true);
            } else {
                setShowAmtInput(false);
                setShowAmtWarning(false);

                props.expense.amount = amtInput;
                props.updateExpense(props.expense);
                setAmtInputValue('');
            }
        }
    }

    return (
        <div className='list-item
                        d-flex
                        justify-content-between
                        text-start
                        border-0
                        border-bottom'
        >
            <div>
                <h5 className={showAmtInput ? 'd-none me-5' : 'me-5'} onClick={event => setShowAmtInput(true)}>
                    {props.expense.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                    })}
                </h5>
                <div className={showAmtInput ? 'input-group' : 'd-none input-group mb-3'}
                     id='amt-entry'
                >
                    <span className="input-group-text" id="basic-addon1">$</span>
                    <div className="form-floating">
                        <input type="text"
                               className="form-control"
                               id="amt-input"
                               placeholder="Amount Input"
                               value={amtInputValue}
                               onKeyUp={event => processAmtInput(event)}
                               onChange={event => {
                                   setAmtInputValue((event.target as HTMLInputElement).value)
                               }}
                        />
                    </div>
                </div>
                <div>
                    <small className={showAmtWarning ? 'text-danger' : 'd-none text-danger'}>Enter a numeric
                        amount.</small>
                </div>

                <small>{
                    new Date(props.expense.date).toLocaleString("en-US", {
                        dateStyle: "medium"
                    })
                }</small>
            </div>
            <p>{props.getAcctNameById(props.expense.accountId)}</p>
        </div>
    );
}