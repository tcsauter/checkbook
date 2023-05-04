import React from "react";
import {SpentListItem} from "./SpentListItem";

export const DetailsCard: React.FC<{name: string}> = (props) => {
    return(
        <div className='card bg-info text-light w-75' id='detailsCard'>
            <div className='card-body'>
                <h5 className='card-title'>Details</h5>
                <ul className='list-group'>
                    <SpentListItem amount={145.36} date={'4/30/2023'} name={"Citi"}/>
                    <SpentListItem amount={4.35} date={'4/30/2023'} name={"BoA"}/>
                </ul>
            </div>
        </div>
    );
}