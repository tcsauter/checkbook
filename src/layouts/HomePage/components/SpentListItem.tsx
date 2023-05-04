import React from "react";

export const SpentListItem: React.FC<{ amount: number, date: string, name: string }> = (props) => {


    return (
        <a href='#' className='list-item
                                d-flex
                                justify-content-between
                                text-start
                                text-light
                                text-decoration-underline
                                bg-info
                                border-0
                                border-bottom'
        >
            <div>
                <h5 className='me-5'>${props.amount}</h5>
                <small>{props.date}</small>
            </div>
            <p>{props.name}</p>
        </a>
    );
}