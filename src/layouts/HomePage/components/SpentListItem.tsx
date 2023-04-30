import React from "react";

export const SpentListItem: React.FC<{ amount: number, date: string, name: string }> = (props) => {


    return(
        <>
            <a href='#' className='list-group-item list-group-item-action' >
                <div className='d-flex w-100 justify-content-between'>
                    <h5 className='mb-1'>${props.amount}</h5>
                    <small className='text-muted'>{props.date}</small>
                </div>
                <p className='text-start'>{props.name}</p>
            </a>
        </>
    );
}