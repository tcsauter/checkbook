import React from "react";

export const AcctSummaryListItem: React.FC<{ acctName: string, amt: number }> = (props) => {
    return (
        <div className='list-item d-flex justify-content-between text-start'>
            <h6 className='card-text fw-bolder me-5'>{props.acctName}</h6>
            <p className='card-text'>{props.amt.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })}</p>
        </div>
    );
}