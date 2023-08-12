import AccountModel from "../../../models/AccountModel";
import React from "react";
import {useSubmit} from "react-router-dom";

export const DisplayAccountInfoLayout: React.FC<{
    account: AccountModel,
    setShowUpdateForm: React.Dispatch<React.SetStateAction<boolean>>
}> = (props) => {
    const submit = useSubmit();

    function handleDelete() {
        const formData = new FormData();
        formData.append("intent", "deleteAccount");
        formData.append("id", props.account.id);

        submit(formData, {method: "delete"});
    }

    return(
        <div className="m-2 p-2">
            <div className="row">
                <div className="col-md-9 col-xl-10">
                <span className="card-text">{props.account.name}</span>
                {props.account.lastFour ?
                    <span className="badge text-muted">{props.account.lastFour}</span>
                    :
                    <></>
                }
                </div>
                <div className="d-none d-md-block col-md-3 col-xl-2">
                    <input type="button" className="btn btn-outline-info me-1" value="Edit"
                           onClick={() => props.setShowUpdateForm(true)}
                    />
                    <input type="button" className="btn btn-outline-danger" value="Delete"
                           onClick={() => handleDelete()}
                    />
                </div>
            </div>
            <span className="card-text">{props.account.type}</span>
            <div className="d-block d-md-none">
                <input type="button" className="btn btn-outline-info me-1" value="Edit"
                       onClick={() => props.setShowUpdateForm(true)}
                />
                <input type="button" className="btn btn-outline-danger" value="Delete"
                       onClick={() => handleDelete()}
                />
            </div>
        </div>
    );
}