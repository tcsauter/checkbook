import React from "react";
import {CreditBalanceSummaryCard} from "./components/CreditBalanceSummaryCard";
import {RemainCard} from "./components/RemainCard";
import {DetailsCard} from "./components/DetailsCard";

export const HomePage: React.FC<{ name: string }> = (props) => {
    return (
        <div className='container mt-3'>
            {/*desktop*/}
            <div className='d-none d-md-flex justify-content-evenly'>
                <div className='me-3'>
                    <RemainCard name={""}/>
                    <CreditBalanceSummaryCard name={"Travis Sauter-Hunsberger"}/>
                </div>
                <div className='w-75'>
                    <DetailsCard name={""}/>
                </div>
            </div>

            {/*mobile*/}
            <div className='d-md-none'>
                <RemainCard name={""}/>
                <CreditBalanceSummaryCard name={"Travis Sauter-Hunsberger"}/>
                <DetailsCard name={""}/>
            </div>
        </div>
    );
}