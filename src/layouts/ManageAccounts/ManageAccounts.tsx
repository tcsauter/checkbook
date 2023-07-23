import {useRouteLoaderData, useSubmit} from "react-router-dom";
import AccountModel from "../../models/AccountModel";
import React, {useState} from "react";
import {addAccount} from "../../utils/accountUtil";

export async function action({request}: { request: any }) {
    const formData = await request.formData();
    const intent = formData.get("intent");

    if(intent === "addAccount") {
        const id = formData.get("id");
        const name = formData.get("name");
        const type = formData.get("type");
        const lastFour = formData.get("lastFour");

        await addAccount({
            id: id,
            name: name,
            type: type,
            lastFour: lastFour
        });

        return null;
    }
}

export const ManageAccounts = () => {
    const {accounts} = useRouteLoaderData("root") as { accounts: AccountModel[] };
    const submit = useSubmit();

    const [inputName, setInputName] = useState("");
    const [inputType, setInputType] = useState("Cash");
    const [inputLastFour, setInputLastFour] = useState("");
    const [formValidationError, setFormValidationError] = useState(false);

    function handleSubmit() {
        const formIsValid = inputName !== "";

        if(formIsValid) {
            setFormValidationError(false);
            const id = Date.now().toString();

            const formData = new FormData();
            formData.append("intent", "addAccount");
            formData.append("id", id);
            formData.append("name", inputName);
            formData.append("type", inputType);
            if (inputLastFour) formData.append("lastFour", inputLastFour);

            submit(formData, {method: "post"});

            setInputName("");
            setInputType("Cash");
            setInputLastFour("");
        } else {
            setFormValidationError(true);
        }
    }

    return (
        <div className="container bg-black min-vh-100 bg-opacity-75">
            <div className="card text-muted shadow">
                <h5 className="card-title mt-3">Add New Account</h5>
                <div className="card-body d-grid">
                    <form className="row g-3">
                        <div className="col-lg-4">
                            <div className="input-group">
                                <span className="card-text input-group-text">Account Name</span>
                                <input type="text" className="card-text form-control"
                                       value={inputName}
                                       onInput={(event) => setInputName(event.currentTarget.value)}
                                       required
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="input-group">
                                <span className="card-text input-group-text">Last 4 Digits</span>
                                <input type="text" className="card-text form-control" placeholder="xxxx"
                                       value={inputLastFour}
                                       onInput={event => setInputLastFour(event.currentTarget.value)}
                                       required={false}
                                />
                            </div>
                            <small className="card-text ms-3">For identification purposes. Not required.</small>
                        </div>
                        <div className="col-lg-2">
                            <p className="card-text form-label">Type</p>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="radioType"
                                       id="radioTypeCash" checked={inputType === "Cash"}
                                       onChange={() => setInputType("Cash")}
                                />
                                <label className="form-check-label" htmlFor="radioTypeCash">Cash</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="radioType"
                                       id="radioTypeCredit" checked={inputType === "Credit"}
                                       onChange={() => setInputType("Credit")}
                                />
                                <label className="form-check-label" htmlFor="radioTypeCredit">Credit</label>
                            </div>
                        </div>
                        <div className="col-lg-1">
                            <input type="button" className="btn btn-dark" value="Submit"
                                   onClick={() => handleSubmit()}
                            />
                        </div>
                    </form>
                    <small className={formValidationError ? "text-danger" : "d-none text-danger"}>Account name must be provided.</small>
                </div>
            </div>
        </div>
    );
}