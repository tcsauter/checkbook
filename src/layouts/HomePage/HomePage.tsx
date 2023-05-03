import React from "react";
import {SpentListItem} from "./components/SpentListItem";
import {AccountsSummary} from "./components/AccountsSummary";

export const HomePage: React.FC<{ name: string }> = (props) => {
    return (
        <>
            <div className='container d-flex justify-content-between'>
                <div className='container' id='accountsSummaryContainer'>
                    <AccountsSummary name={"Travis Sauter-Hunsberger"}/>
                </div>
                <div className='container' id='spentMoneyContainer'>
                    <h5>Details</h5>
                    <ul className='list-group'>
                        <SpentListItem amount={145.36} date={'4/30/2023'} name={"Citi"}/>
                        <SpentListItem amount={4.35} date={'4/30/2023'} name={"BoA"}/>
                    </ul>
                </div>
            </div>
        </>
    );
}