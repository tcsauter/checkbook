import React from "react";
import {SpentListItem} from "./components/SpentListItem";
import {AccountsSummaryCard} from "./components/AccountsSummaryCard";
import {RemainCard} from "./components/RemainCard";
import {DetailsCard} from "./components/DetailsCard";

export const HomePage: React.FC<{ name: string }> = (props) => {
    return (
        <div className='container d-flex justify-content-between mt-3'>
            <div className='me-1'>
                <RemainCard name={""}/>
                <AccountsSummaryCard name={"Travis Sauter-Hunsberger"}/>
            </div>
            <DetailsCard name={""} />
        </div>
    );
}