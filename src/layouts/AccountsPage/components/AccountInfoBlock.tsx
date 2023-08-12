import AccountModel from "../../../models/AccountModel";
import {DisplayAccountInfoLayout} from "./DisplayAccountInfoLayout";
import React, {useState} from "react";
import {UpdateAccountInfoLayout} from "./UpdateAccountInfoLayout";

export const AccountInfoBlock: React.FC<{ account: AccountModel }> = (props) => {
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    return (
        <div className="m-1">
            {showUpdateForm ?
                <UpdateAccountInfoLayout account={props.account} setShowUpdateForm={setShowUpdateForm}/>
                :
                <DisplayAccountInfoLayout account={props.account} setShowUpdateForm={setShowUpdateForm}/>
            }
            <hr className="ms-3 me-5" />
        </div>
    );
}