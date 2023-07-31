import React from "react";
import {useRouteLoaderData, useSubmit} from "react-router-dom";
import BudgetPeriodModel from "../../../models/BudgetPeriodModel";

export const ManageBudgetPeriodsCard = () => {
    const submit = useSubmit();
    const { budgetPeriods } = useRouteLoaderData("root") as { budgetPeriods: BudgetPeriodModel[] };

    function handleDelete(bpId: string) {
        const formData = new FormData();
        formData.append("intent", "deleteBudgetPeriod");
        formData.append("id", bpId);

        submit(formData, { method: "delete" });
    }

    return(
        <div className="card text-muted shadow">
            <h5 className="card-title mt-3">Manage Budget Periods</h5>
            {budgetPeriods.map(bp => {
                return (
                    <div className="card-body d-block d-md-grid" key={bp.id}>
                        <div className="row">
                            <div className="col-xl-2"></div>
                            <div className="col-md-4 col-xl-3">
                                <p className="card-text">
                                    <span className="text-black">Pay Date: </span>
                                    {new Date(bp.payDate).toLocaleDateString("en-US", {
                                        dateStyle: "medium",
                                        timeZone: "utc"
                                    })}
                                </p>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <p className="card-text">
                                    <span className="text-black">Period Range: </span>
                                    {new Date(bp.budgetStart).toLocaleDateString("en-US", {
                                        timeZone: "utc",
                                        month: "short",
                                        day: "numeric"
                                    })}
                                    {" - "}
                                    {new Date(bp.budgetEnd).toLocaleDateString("en-US", {
                                        timeZone: "utc",
                                        month: "short",
                                        day: "numeric"
                                    })}
                                </p>
                            </div>
                            <div className="col-md-2 col-lg-1 card-text">
                                <input type="button" className="btn btn-outline-danger" value="Delete"
                                       onClick={() => handleDelete(bp.id)} />
                            </div>
                            <div className="col-xl-2"></div>
                        </div>
                        <hr className="ms-lg-3 ms-xl-5 me-5 mb-0" />
                    </div>
                )
            })}
        </div>
    );
}