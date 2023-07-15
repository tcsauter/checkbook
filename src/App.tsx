import { Outlet, defer } from "react-router-dom";
import './App.css';
import {Navbar} from "./layouts/NavbarAndFooter/Navbar";
import AccountModel from "./models/AccountModel";
import BudgetPeriodModel from "./models/BudgetPeriodModel";
import {findCurrentBudgetPeriod, getBudgetPeriods} from "./utils/budgetPeriodUtil";
import {getAccounts} from "./utils/accountUtil";

export async function loader() {
    //get budget periods
    const budgetPeriods: BudgetPeriodModel[] = await getBudgetPeriods();
    const budgetPeriod: BudgetPeriodModel | undefined = findCurrentBudgetPeriod(budgetPeriods);

    //get accounts
    const accounts: Promise<AccountModel[]> = getAccounts();

    return defer({ budgetPeriods, budgetPeriod, accounts });
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
