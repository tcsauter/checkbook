import React, {useState} from "react";

export const RemainCard: React.FC<{ initialAmount: number }> = (props) => {
    const [initAmt, setInitAmt] = useState(props.initialAmount);

    function theSwitcheroo() {
        const remainInitAmtLabel = document.getElementById('remain-init-amt-label');
        const remainAmtElem = document.getElementById('remain-amt-elem');
        const initAmtEntry = document.getElementById('init-amt-entry');
        const initAmtInput: HTMLInputElement = document.getElementById('init-amt-input') as HTMLInputElement;

        // @ts-ignore
        remainInitAmtLabel.innerText = 'Enter Starting Amount'
        remainAmtElem?.setAttribute('class', 'd-none mt-2');
        initAmtEntry?.setAttribute('class', 'input-group mb-3');
        // initAmtInput.
    }

    return (
        <div className='card bg-light text-muted shadow' id='remain-container'>
            <div className='card-body'>
                <h5 className='card-title' id='remain-init-amt-label'>Remaining Amount</h5>
                <p className='card-text mt-2' id='remain-amt-elem' onClick={theSwitcheroo}>
                    {initAmt.toLocaleString('en-US', {
                        style: "currency",
                        currency: "USD"
                    })}
                </p>
                <div className="d-none input-group mb-3" id='init-amt-entry'>
                    <span className="input-group-text" id="basic-addon1">$</span>
                    <div className="form-floating">
                        <input type="text"
                               className="form-control"
                               id="init-amt-input"
                               placeholder="Initial Ammount Input"
                               onKeyUp={(event) => {
                                   if(event.key === 'Enter') {
                                       const remainInitAmtLabel = document.getElementById('remain-init-amt-label');
                                       const remainAmtElem = document.getElementById('remain-amt-elem');
                                       const initAmtEntry = document.getElementById('init-amt-entry');
                                       const initAmtInput: HTMLInputElement = document.getElementById('init-amt-input') as HTMLInputElement;

                                       const entry = Number(initAmtInput.value);

                                       if(!isNaN(entry)) {
                                           // @ts-ignore
                                           remainInitAmtLabel.innerText = 'Remaining Amount'
                                           remainAmtElem?.setAttribute('class', 'card-text mt-2');
                                           initAmtEntry?.setAttribute('class', 'd-none mb-3');

                                           setInitAmt(Number(initAmtInput.value));
                                           initAmtInput.value = '';
                                       }else{
                                           const hintText = document.getElementById('hint-text');
                                           hintText?.setAttribute('class', 'text-danger')
                                       }
                                   }
                               }}
                        />
                    </div>
                </div>
                <small className='d-none' id='hint-text'>Enter a numeric value.</small>
            </div>
        </div>
    );
}