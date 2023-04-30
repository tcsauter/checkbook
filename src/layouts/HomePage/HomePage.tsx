import React from "react";
import {SpentListItem} from "./components/SpentListItem";

export const HomePage: React.FC<{ name: string }> = (props) => {
    return(
        <div className='container'>
            <ul className='list-group' >
                <SpentListItem amount={145.36} date={'4/30/2023'} name={"Citi"} />
                <SpentListItem amount={4.35} date={'4/30/2023'} name={"BoA"} />
            </ul>
        </div>
    );
}