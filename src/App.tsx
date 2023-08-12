import {Outlet} from "react-router-dom";
import './App.css';
import {Navbar} from "./layouts/NavbarAndFooter/Navbar";
import AccountModel from "./models/AccountModel";
import BudgetPeriodModel from "./models/BudgetPeriodModel";
import {findCurrentBudgetPeriod, getBudgetPeriods} from "./utils/budgetPeriodUtil";
import {getAccounts} from "./utils/accountUtil";
import BillModel from "./models/BillModel";
import {getBills} from "./utils/billUtil";

export async function loader() {
    //get budget periods
    const budgetPeriods: BudgetPeriodModel[] = await getBudgetPeriods();
    const currentBudgetPeriod: BudgetPeriodModel | undefined = findCurrentBudgetPeriod(budgetPeriods);

    //get accounts
    const accounts: AccountModel[] = await getAccounts();

    //get bills
    const bills: BillModel[] = await getBills();

    return { budgetPeriods, currentBudgetPeriod, accounts, bills };
}

function App() {
    return (
        <div className="App">
            <Navbar />
            <div id="page-contents">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
