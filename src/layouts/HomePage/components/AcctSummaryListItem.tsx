import React from "react";

export const AcctSummaryListItem: React.FC<{ acctName: string, amt: string }> = (props) => {
    return (
        <div className='list-item d-flex justify-content-between text-start'>
            <h5>{props.acctName}</h5>
            <p>${props.amt}</p>
        </div>
    );
}