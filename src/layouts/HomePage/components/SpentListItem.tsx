import React from "react";

export const SpentListItem: React.FC<{ amount: number, date: string, name: string }> = (props) => {


    return (
        <div className='list-item
                        d-flex
                        justify-content-between
                        text-start
                        border-0
                        border-bottom'
        >
            <div>
                <h5 className='me-5'>${props.amount}</h5>
                <small>{props.date}</small>
            </div>
            <p>{props.name}</p>
        </div>
    );
}