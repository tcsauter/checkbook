import React, {useEffect, useState} from "react";
import {RemainCardProps} from "../../../models/props";
import {useLoaderData, useParams, useSubmit} from "react-router-dom";
import BudgetPeriodModel from "../../../models/BudgetPeriodModel";

export const RemainCard: React.FC<{ input: RemainCardProps }> = (props) => {
    const {budgetPeriods} = useLoaderData() as { budgetPeriods: BudgetPeriodModel[] };
    const params = useParams();
    const submit = useSubmit();

    const [initAmtEntryValue, setInitAmtEntryValue] = useState<string>('')
    const [showEnterRemainAmt, setShowEnterRemainAmt] = useState(false);
    const [showHintText, setShowHintText] = useState(false);
    const [selectedBudgetPeriod, setSelectedBudgetPeriod] = useState<BudgetPeriodModel>();

    useEffect(() => {
        setSelectedBudgetPeriod(
            budgetPeriods.find((bp) => bp.budgetStart === params.startDate)
        );
    }, [budgetPeriods, params])

    function takeInitAmtInput(): void {
        const entry = Number(initAmtEntryValue);

        if (initAmtEntryValue === '' || initAmtEntryValue === selectedBudgetPeriod?.startingAmt.toLocaleString("en-US")) {
            setShowEnterRemainAmt(false);
            setShowHintText(false);
        } else if (isNaN(entry)) {
            setShowHintText(true);
        } else {
            setShowEnterRemainAmt(false);
            setShowHintText(false);

            const formData = new FormData();
            formData.append("intent", "updateBudgetPeriod");
            formData.append("budgetPeriod", JSON.stringify(selectedBudgetPeriod, (key, value) => key === "startingAmt" ? entry : value));
            submit(formData, {method: "put"});

            setInitAmtEntryValue('');
        }
    }

    return (
        <div className='card bg-light text-muted shadow mb-md-3' id='remain-container'>
            <div className='card-body'>
                <h5 className='card-title' id='remain-init-amt-label'>
                    {showEnterRemainAmt ? 'Enter Starting Amount' : 'Remaining Amount'}
                </h5>
                <>
                    <p className={showEnterRemainAmt ? 'd-none card-text mt-2' : 'card-text text-center mt-2'}
                       id='remain-amt-elem'
                       onClick={() => {
                           setShowEnterRemainAmt(true);
                           if (selectedBudgetPeriod) {
                               setInitAmtEntryValue(selectedBudgetPeriod.startingAmt.toLocaleString("en-US"));
                           }
                       }}
                    >
                        {selectedBudgetPeriod ?
                            (selectedBudgetPeriod?.startingAmt - props.input.totalSpent).toLocaleString('en-US', {
                                style: "currency",
                                currency: "USD"
                            })
                            :
                            550
                        }
                    </p>
                </>
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
                           onClick={takeInitAmtInput}/>
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