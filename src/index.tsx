import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App, { loader as appLoader } from './App';
import {ErrorPage} from "./layouts/ErrorPage/ErrorPage";
import {HomePage, loader as homeLoader, action as homeAction} from "./layouts/HomePage/HomePage";
import {ManageBudgetPeriods, action as mbpAction} from "./layouts/ManageBudgetPeriods/ManageBudgetPeriods";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        id: "root",
        errorElement: <ErrorPage />,
        loader: appLoader,
        children: [
            {
                path: "/expenses/:startDate?/:endDate?",
                element: <HomePage />,
                loader: homeLoader,
                action: homeAction
            },
            {
                path: "/managebudgetperiods",
                element: <ManageBudgetPeriods />,
                action: mbpAction
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
