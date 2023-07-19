import React, {useState} from "react";
import ExpenseModel from "../../../models/ExpenseModel";
import {useSubmit} from "react-router-dom";

export const ExpenseListItem: React.FC<{
    expense: ExpenseModel,
    acctName: string | undefined
}> = (props) => {
    const submit = useSubmit();

    const [showAmtInput, setShowAmtInput] = useState(false);
    const [showAmtWarning, setShowAmtWarning] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [amtInputValue, setAmtInputValue] = useState('');

    function processAmtInput(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key === "Enter") {
            const amtInput = Number(amtInputValue);

            if (amtInputValue === '') {
                setShowAmtInput(false);
                setShowAmtWarning(false);
                setShowDelete(false);
            } else if (isNaN(amtInput)) {
                setShowAmtWarning(true);
                setShowDelete(false);
            } else {
                setShowAmtInput(false);
                setShowAmtWarning(false);
                setShowDelete(false);

                const formData = new FormData();
                formData.append("intent", "updateExpenseAmt");
                formData.append("expense", JSON.stringify(props.expense, (key, value) => key === "amount" ? amtInput : value));
                submit(formData, { method: "put" });
                setAmtInputValue('');
            }
        }
    }

    function processExpenseDelete() {
        const formData = new FormData();
        formData.append("intent", "deleteExpense");
        formData.append("id", props.expense.id);
        submit(formData, { method: "delete" });
    }

    return (
        <div className='list-item
                        d-flex
                        justify-content-between
                        text-start
                        border-0
                        border-bottom'
             onClick={() => setShowDelete(!showDelete)}
        >
            <div>
                <h5 className={showAmtInput ? 'd-none me-5' : 'me-5'} onClick={() => setShowAmtInput(true)}>
                    {props.expense.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                    })}
                </h5>
                <div className={showAmtInput ? 'input-group mb-3' : 'd-none input-group mb-3'}
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

                <small>
                    {new Date(props.expense.date).toLocaleDateString('en-US', {
                        timeZone: "UTC",
                        dateStyle: "full"
                    })}
                </small>
            </div>
            <div className='d-inline text-end'>
                <p className='mb-0'>{props.acctName}</p>
                <input type='button'
                       className={showDelete && !showAmtInput ? 'btn btn-outline-danger mb-2 mt-1' : 'd-none'}
                       value='Delete'
                       onClick={() => processExpenseDelete()}
                />
            </div>
        </div>
    );
}