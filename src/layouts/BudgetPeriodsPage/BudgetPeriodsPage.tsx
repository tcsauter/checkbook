import React from "react";
import {addBudgetPeriod, addBudgetPeriodBatch, deleteBudgetPeriod} from "../../utils/budgetPeriodUtil";
import {AddNewBudgetPeriodCard} from "./components/AddNewBudgetPeriodCard";
import {ManageBudgetPeriodsCard} from "./components/ManageBudgetPeriodsCard";

export async function action({request}: { request: any }) {
    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "addOne") {
        const bp = JSON.parse(formData.get("budgetPeriod"));

        await addBudgetPeriod(bp);
        return null; //return null because we don't need this data right now, since the loader re-fetches
    }

    if (intent === "addMany") {
        const bps = JSON.parse(formData.get("budgetPeriods"));

        await addBudgetPeriodBatch(bps);
        return null; //return null because we don't need this data right now, since the loader re-fetches
    }

    if (intent === "deleteBudgetPeriod") {
        const id = formData.get("id");

        await deleteBudgetPeriod(id);
        return null; //return null because we don't need this data right now, since the loader re-fetches
    }
}

export const BudgetPeriodsPage = () => {
    return (
        <div className="container bg-black min-vh-100 bg-opacity-75">
            <AddNewBudgetPeriodCard/>

            {/*existing budget periods card */}
            <ManageBudgetPeriodsCard />
        </div>
    );
}