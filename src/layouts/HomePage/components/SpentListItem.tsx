import React, {useState} from "react";

interface SpentListItemProps {
    amount: number,
    date: {
        month: number,
        day: number,
        year: number;
    },
    account: string;
}

export const SpentListItem: React.FC<{ input: SpentListItemProps }> = (props) => {
    const [showAmtInput, setShowAmtInput] = useState(false);
    const [amtInputValue, setAmtInputValue] = useState('');

    function processAmtInput(event: React.KeyboardEvent<HTMLInputElement>) {
        if(event.key === "Enter"){
            const inputValue: number = Number(amtInputValue);

            if(isNaN(inputValue)) {

            }else{
                setShowAmtInput(false);

                //todo: Think more deeply about the flow of data and how individual transactions can be updated safely
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
                <h5 className='me-5'>
                    {props.input.amount.toLocaleString("en-US", {
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
                               onChange={event => setAmtInputValue((event.target as HTMLInputElement).value)}
                        />
                    </div>
                </div>

                <small>{props.input.date.month}/{props.input.date.day}/{props.input.date.year}</small>
            </div>
            <p>{props.input.account}</p>
        </div>
    );
}