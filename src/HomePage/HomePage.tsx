import React from "react";

export const HomePage: React.FC<{ name: string }> = (props) => {
    return(
        <div className='d-block bg-dark'>
            <p>This is some text.</p>
        </div>
    );
}