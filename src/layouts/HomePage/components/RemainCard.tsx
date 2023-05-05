import React from "react";

export const RemainCard: React.FC<{ name: string }> = (props) => {
    return (
        <div className='card bg-light text-muted shadow' id='remain-container'>
            <div className='card-body'>
                <h5 className='card-title'>Remaining Amount</h5>
                <p className='card-text' id='remain-amt'>$435.00</p>
            </div>
        </div>
    );
}