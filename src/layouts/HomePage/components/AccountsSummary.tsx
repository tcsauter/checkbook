import {AcctSummaryListItem} from "./AcctSummaryListItem";

export const AccountsSummary: React.FC<{ name: string }> = (props) => {
    return (
        <>
            <h5>Accounts summary for <b>{props.name}</b></h5>
            <div className='container'>
                <ul className='list-group' >
                    <AcctSummaryListItem acctName={"Bank of America"} amt={"110.33"} />
                    <AcctSummaryListItem acctName={"Citi"} amt={"45.00"} />
                </ul>
                <div className='list-item d-flex justify-content-between text-start'>
                    <h5><b>Total:</b></h5>
                    <p>$353.46</p>
                </div>
            </div>
        </>
    );
}