import AccountModel from "../../../models/AccountModel";
import React, {useState} from "react";
import {useSubmit} from "react-router-dom";

export const UpdateAccountInfoLayout: React.FC<{
    account: AccountModel,
    setShowUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
}> = (props) => {
    const submit = useSubmit();

    const [inputName, setInputName] = useState(props.account.name);
    const [inputLastFour, setInputLastFour] = useState(props.account.lastFour ? props.account.lastFour : "")
    const [inputType, setInputType] = useState(props.account.type);
    const [formValidationError, setFormValidationError] = useState(false);

    function handleSubmit() {
        const formIsValid = inputName !== "";

        if (formIsValid) {
            setFormValidationError(false);
            props.setShowUpdateForm(false);

            const formData = new FormData();
            formData.append("intent", "updateExpense")
            formData.append("id", props.account.id);
            formData.append("name", inputName);
            formData.append("type", inputType);
            if (inputLastFour) formData.append("lastFour", inputLastFour);

            submit(formData, {method: "put"});
        } else {
            setFormValidationError(true);
        }

    }

    return (
        <>
            <form className="m-2 p-2 row g-1 d-flex">
                <button type="button" className="btn-close position-absolute end-0 me-3 d-inline d-xl-none" aria-label="Close"
                        onClick={() => props.setShowUpdateForm(false)}
                ></button>
                <div className="col-xl-6">
                    <div className="input-group">
                        <span className="input-group-text">Name</span>
                        <input className="form-control" type="text" value={inputName}
                               onChange={event => setInputName(event.currentTarget.value)}
                        />
                    </div>
                </div>
                <div className="col-xl-2">
                    <div className="input-group">
                        <span className="input-group-text">Last Four</span>
                        <input className="form-control" type="text" placeholder="xxxx" value={inputLastFour}
                               onChange={event => setInputLastFour(event.currentTarget.value)}
                        />
                    </div>
                </div>
                <div className="col-xl-3">
                    <div className="row g-1">
                        <div className="col-xl-1"></div>
                        <div className="form-check col-5">
                            <input className="form-check-input" type="radio" name="radioTypeUpdate"
                                   id="radioTypeUpdateCash" checked={inputType === "Cash"}
                                   onChange={() => setInputType("Cash")}
                            />
                            <label className="form-check-label" htmlFor="radioTypeCash">Cash</label>
                        </div>
                        <div className="form-check col-5">
                            <input className="form-check-input" type="radio" name="radioTypeUpdate"
                                   id="radioTypeUpdateCredit" checked={inputType === "Credit"}
                                   onChange={() => setInputType("Credit")}
                            />
                            <label className="form-check-label" htmlFor="radioTypeCredit">Credit</label>
                        </div>
                        <div className="col-xl-1"></div>
                    </div>
                </div>
                <div className="col-xl-1">
                    <input type="button" className="btn btn-dark" value="Submit"
                           onClick={() => handleSubmit()}
                    />
                    <button type="button" className="btn-close position-absolute d-none d-xl-inline" aria-label="Close"
                            onClick={() => props.setShowUpdateForm(false)}
                    ></button>
                </div>
            </form>
            <small className={formValidationError ? "text-danger" : "d-none text-danger"}>Account name must be provided.</small>
        </>
    );
}