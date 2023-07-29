import {useRouteLoaderData} from "react-router-dom";
import AccountModel from "../../models/AccountModel";
import {addAccount, deleteAccount, updateAccount} from "../../utils/accountUtil";
import {AddNewAccountCard} from "./components/AddNewAccountCard";
import {AccountInfoBlock} from "./components/AccountInfoBlock";

export async function action({request}: { request: any }) {
    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "addAccount") {
        const id = formData.get("id");
        const name = formData.get("name");
        const type = formData.get("type");
        const lastFour = formData.get("lastFour");

        await addAccount({
            id: id,
            name: name,
            type: type,
            lastFour: lastFour
        });

        return null;
    }

    if (intent === "deleteAccount") {
        const id = formData.get("id");

        await deleteAccount(id);

        return null;
    }

    if (intent === "updateExpense") {
        const id = formData.get("id");
        const name = formData.get("name");
        const type = formData.get("type");
        const lastFour = formData.get("lastFour");

        await updateAccount({
            id: id,
            name: name,
            type: type,
            lastFour: lastFour
        })

        return null;
    }
}

export const ManageAccounts = () => {
    const {accounts} = useRouteLoaderData("root") as { accounts: AccountModel[] };

    return (
        <div className="container bg-black min-vh-100 bg-opacity-75">
            <AddNewAccountCard/>

            {/*card for managing accounts*/}
            <div className="card text-muted shadow">
                <h5 className="card-title mt-3">Manage Accounts</h5>
                <div className="card-body">
                    {accounts.map(account => {
                        return (
                            <AccountInfoBlock account={account} key={account.id}/>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}