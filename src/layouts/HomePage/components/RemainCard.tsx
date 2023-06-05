import React, {useState} from "react";
import {RemainCardProps} from "../../../models/props";

export const RemainCard: React.FC<{ input: RemainCardProps }> = (props) => {
    const [initAmtEntryValue, setInitAmtEntryValue] = useState<string>('')
    const [showEnterRemainAmt, setShowEnterRemainAmt] = useState(false);
    const [showHintText, setShowHintText] = useState(false);

    function takeInitAmtInput(event: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
        const entry = Number(initAmtEntryValue);

        if(initAmtEntryValue === ''){
            setShowEnterRemainAmt(false);
            setShowHintText(false);
        }else if(isNaN(entry)){
            setShowHintText(true);
        }else{
            setShowEnterRemainAmt(false);
            setShowHintText(false);

            props.input.setInitAmt(entry);
            setInitAmtEntryValue('');
        }
    }

    return (
        <div className='card bg-light text-muted shadow' id='remain-container'>
            <div className='card-body'>
                <h5 className='card-title' id='remain-init-amt-label'>
                    {showEnterRemainAmt ? 'Enter Starting Amount' : 'Remaining Amount'}
                </h5>
                <p className={showEnterRemainAmt ? 'd-none card-text mt-2' : 'card-text mt-2'}
                   id='remain-amt-elem'
                   onClick={() => setShowEnterRemainAmt(true)}
                >
                    {(props.input.initialAmount - props.input.totalSpent).toLocaleString('en-US', {
                        style: "currency",
                        currency: "USD"
                    })}
                </p>
                <div className={showEnterRemainAmt ? 'input-group mb-3' : 'd-none input-group mb-3'}
                     id='init-amt-entry'
                >
                    <span className="input-group-text" id="basic-addon1">$</span>
                    <div className="form-floating">
                        <input type="text"
                               className="form-control"
                               id="init-amt-input"
                               placeholder="Initial Amount Input"
                               value={initAmtEntryValue}
                               onChange={event => setInitAmtEntryValue((event.target as HTMLInputElement).value)}

                        />
                    </div>
                    <input type="button"
                           value="Update"
                           className="btn btn-dark"
                           onClick={event => takeInitAmtInput(event)}/>
                </div>
                <small className={showHintText ? 'text-danger' : 'd-none text-danger'}
                       id='hint-text'
                >
                    Enter a numeric value.
                </small>
            </div>
        </div>
    );
}