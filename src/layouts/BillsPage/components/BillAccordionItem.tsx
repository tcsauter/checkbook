import React, {useState} from "react";
import BillModel from "../../../models/BillModel";
import {useSubmit} from "react-router-dom";

export const BillAccordionItem: React.FC<{ bill: BillModel }> = (props) => {
    //todo: resolve extra spaces that build up in comment

    const submit = useSubmit();

    const [paidSoFarInput, setPaidSoFarInput] = useState(props.bill.paidSoFar ? props.bill.paidSoFar.toString() : "");
    const [commentInput, setCommentInput] = useState(props.bill.comment ? props.bill.comment : "");
    const [fieldChanged, setFieldChanged] = useState(false);

    function acceptUpdates() {
        if (fieldChanged) {
            console.log("fields changed")
            const formData = new FormData();
            formData.set("intent", "update");
            formData.set("bill", JSON.stringify(props.bill));

            submit(formData, {method: "PUT"});
            setFieldChanged(false);
        }
    }

    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button row g-3 collapsed" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#billDetail" + props.bill.id}
                        aria-expanded="false" aria-controls={"#billDetail" + props.bill.id}>
                    <div className="col-4 col-xl-3 m-0">
                        {props.bill.description}
                    </div>
                    <div className="col-4 col-xl-3 m-0">
                        Due: {props.bill.frequency.toLowerCase() === "yearly" ?
                        new Date("2023-" + props.bill.due).toLocaleDateString("en-US", {
                            timeZone: "utc",
                            month: "short",
                            day: "numeric"
                        })
                        :
                        props.bill.due
                    }
                    </div>
                    <div className="col-3 col-xl-2 m-0 text-nowrap">
                        {props.bill.amount.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD"
                        })}{props.bill.isPaidFromBudget ? "*" : ""}
                    </div>
                    <div className="d-none d-xl-inline-grid col-xl-3 m-0" hidden>
                        <span className="card-text">
                            Comment: {" "}
                            <input type="text" className="border-0 bg-transparent" value={commentInput}
                                   onInput={event => {
                                       setFieldChanged(true);
                                       setCommentInput(event.currentTarget.value);
                                   }}
                                   onBlur={() => {
                                       props.bill.comment = commentInput;
                                       acceptUpdates();
                                   }}
                            />
                        </span>
                    </div>
                </button>
            </h2>
            <div id={"billDetail" + props.bill.id} className="accordion-collapse collapse billDetails">
                <div className="accordion-body bg-body-secondary">
                    <div className="card-text">
                        Frequency: {props.bill.frequency}
                    </div>
                    {props.bill.isPaidInInstallments ?
                        <span className="card-text me-1">
                            Paid so far: {" "}
                            <input type="number" className="border-0 bg-body-secondary" value={paidSoFarInput}
                                   onInput={event => {
                                       setFieldChanged(true);
                                       setPaidSoFarInput(event.currentTarget.value);
                                   }}
                                   onBlur={() => {
                                       if (fieldChanged) {
                                           //add remaining amount to comment if some amount has been paid
                                           props.bill.comment = (props.bill.comment.includes("Remain:") ?
                                                   props.bill.comment.replace(`Remain: $${props.bill.amount - props.bill.paidSoFar}`,
                                                       (paidSoFarInput ? `Remain: $${props.bill.amount - Number(paidSoFarInput)}` : "")
                                                   )
                                                   :
                                                   commentInput + (" ") +
                                                   (paidSoFarInput ? `Remain: $${props.bill.amount - Number(paidSoFarInput)}` : "")
                                           ).trim();
                                           setCommentInput(props.bill.comment);

                                           props.bill.paidSoFar = paidSoFarInput ? Number(paidSoFarInput) : 0;
                                           acceptUpdates();
                                       }
                                   }}
                            />
                        </span>
                        :
                        <></>
                    }
                    <span className="card-text d-xl-none">
                        Comment: {" "}
                        <input type="text" className="border-0 bg-body-secondary" value={commentInput}
                               onInput={event => {
                                   setFieldChanged(true);
                                   setCommentInput(event.currentTarget.value);
                               }}
                               onBlur={() => {
                                   props.bill.comment = commentInput;
                                   acceptUpdates();
                               }}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}