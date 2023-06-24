import {AcctSummaryListItem} from "./AcctSummaryListItem";
import {CreditBalanceSummaryCardProps} from "../../../models/props";

export const CreditBalanceSummaryCard: React.FC<{
    creditAccountSummaryArray: CreditBalanceSummaryCardProps[],
    stillLoading: boolean
}> = (props) => {

    function calculateCreditBalanceTotal(): number {
        let total: number = 0;
        props.creditAccountSummaryArray.forEach(acctTotal => total += acctTotal.amount);
        return total;
    }

    return (
        <div className='card bg-light text-muted shadow' id='credit-balance-summary-card'>
            <div className='card-body'>
                <h5 className='card-title'>Credit Balance Summary</h5>
                <div>
                    {props.stillLoading ?
                        <><p>Loading...</p></>
                        :
                        <>
                            <ul className='list-group mt-4'>
                                {props.creditAccountSummaryArray.map(summaryItem => {
                                    return <AcctSummaryListItem acctName={summaryItem.accountName}
                                                                amt={summaryItem.amount}
                                                                key={Math.random()}
                                    />
                                })}
                            </ul>
                            <hr/>
                            <div className='d-flex justify-content-between'>
                                <h5 className='card-text me-5'><b>Total:</b></h5>
                                <p className='card-text'>{calculateCreditBalanceTotal().toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD"
                                })}</p>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}