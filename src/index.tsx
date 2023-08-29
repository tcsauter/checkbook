import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App, { loader as appLoader } from './App';
import {ErrorPage} from "./layouts/ErrorPage/ErrorPage";
import {HomePage, loader as homeLoader, action as homeAction} from "./layouts/HomePage/HomePage";
import {BudgetPeriodsPage, action as mbpAction} from "./layouts/BudgetPeriodsPage/BudgetPeriodsPage";
import {AccountsPage, action as maAction} from "./layouts/AccountsPage/AccountsPage";
import {BillsPage, action as billsAction} from "./layouts/BillsPage/BillsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        id: "root",
        errorElement: <ErrorPage />,
        loader: appLoader,
        children: [
            {
                path: "/:startDate?/:endDate?",
                element: <HomePage />,
                loader: homeLoader,
                action: homeAction
            },
            {
                path: "/managebudgetperiods",
                element: <BudgetPeriodsPage />,
                action: mbpAction
            },
            {
                path: "/manageaccounts",
                element: <AccountsPage />,
                action: maAction
            },
            {
                path:"/managebills",
                element: <BillsPage />,
                action: billsAction
            }
        ]
    }
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
