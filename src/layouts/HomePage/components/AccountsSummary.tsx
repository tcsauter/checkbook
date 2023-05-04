import {AcctSummaryListItem} from "./AcctSummaryListItem";

export const AccountsSummary: React.FC<{ name: string }> = (props) => {
    return (
        <div className='card-body text-light'>
            <h5 className='card-title'>Summary by Account</h5>
            <div>
                <ul className='list-group mt-4' >
                    <AcctSummaryListItem acctName={"Bank of America"} amt={"110.33"} />
                    <AcctSummaryListItem acctName={"Citi"} amt={"45.00"} />
                </ul>
                <hr />
                <div className='d-flex justify-content-between'>
                    <h5 className='card-text me-5'><b>Total:</b></h5>
                    <p className='card-text'>$353.46</p>
                </div>
            </div>
        </div>
    );
}