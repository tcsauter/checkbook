import React from "react";
import {SpentListItem} from "./components/SpentListItem";
import {AccountsSummaryCard} from "./components/AccountsSummaryCard";
import {RemainCard} from "./components/RemainCard";

export const HomePage: React.FC<{ name: string }> = (props) => {
    return (
        <div className='container d-flex mt-3'>
            <div className='container'>
                <RemainCard name={""}/>
                <AccountsSummaryCard name={"Travis Sauter-Hunsberger"}/>
            </div>
            <div id='spentMoneyContainer'>
                <h5>Details</h5>
                <ul>
                    <SpentListItem amount={145.36} date={'4/30/2023'} name={"Citi"}/>
                    <SpentListItem amount={4.35} date={'4/30/2023'} name={"BoA"}/>
                </ul>
            </div>
        </div>
    );
}