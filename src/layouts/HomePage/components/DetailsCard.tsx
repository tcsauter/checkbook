import React from "react";
import {SpentListItem} from "./SpentListItem";

export const DetailsCard: React.FC<{name: string}> = (props) => {
    return(
        <div className='card bg-light text-muted shadow' id='details-card'>
            <div className='card-body'>
                <h5 className='card-title'>Details</h5>
                <ul className='list-group'>
                    <SpentListItem input={{
                        amount: 145.36,
                        date: {
                            month: 4,
                            day: 30,
                            year: 2023
                        },
                        account: "Citi"
                    }} />
                    <SpentListItem input={{
                        amount: 4.35,
                        date: {
                            month: 4,
                            day: 30,
                            year: 2023
                        },
                        account: "Bank of America"
                    }} />
                </ul>
            </div>
        </div>
    );
}