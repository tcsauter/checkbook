import {useRouteLoaderData} from "react-router-dom";
import AccountModel from "../../models/AccountModel";

export async function action({ request }: { request: any }) {

}

export const ManageAccounts = () => {
    const { accounts } = useRouteLoaderData("root") as { accounts: AccountModel[] };

    return(
        <div></div>
    );
}