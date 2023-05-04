import React from "react";

export const SpentListItem: React.FC<{ amount: number, date: string, name: string }> = (props) => {


    return(
        <>
            <a href='#'>
                <div >
                    <h5 >${props.amount}</h5>
                    <small>{props.date}</small>
                </div>
                <p>{props.name}</p>
            </a>
        </>
    );
}