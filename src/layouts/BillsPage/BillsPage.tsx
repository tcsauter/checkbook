import {Link, useRouteLoaderData} from "react-router-dom";
import BillModel, {frequencyList} from "../../models/BillModel";
import {BillAccordionItem} from "./components/BillAccordionItem";
import {deleteBill, updateBill} from "../../utils/billUtil";
import {ChevronDoubleDown, ChevronDoubleUp} from "react-bootstrap-icons";
import React, {useEffect, useState} from "react";
import {getMonthArray, Month} from "../../utils/dateUtils";

export async function action({request}: { request: any }) {
    //todo: add the ability to create a new bill.

    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "update") {
        const bill = JSON.parse(formData.get("bill"));

        await updateBill(bill);
        return null;
    }

    if (intent === "delete") {
        await deleteBill(formData.get("billId"));
        return null;
    }
}

export const BillsPage = () => {
    const {bills} = useRouteLoaderData("root") as { bills: BillModel[] }

    const [toggle, setToggle] = useState(false);
    const [inputDescription, setInputDescription] = useState("");
    const [month, setMonth] = useState<Month>();
    const [inputDueMonth, setInputDueMonth] = useState("");
    const [inputDueDay, setInputDueDay] = useState("");
    const [inputAmount, setInputAmount] = useState("");
    const [inputFrequency, setInputFrequency] = useState("");
    const [inputComment, setInputComment] = useState("")
    const [paidFromBudget, setPaidFromBudget] = useState(false);
    const [paidInInstallments, setPaidInInstallments] = useState(false);
    const [inputPaidSoFar, setInputPaidSoFar] = useState("");

    useEffect(() => {
        setInputDueMonth(month ? month.name : "");
    }, [month]);

    useEffect(() => {
        if (inputFrequency.toLowerCase() === "bi-weekly" || inputFrequency.toLowerCase() === "quarterly") {
            setInputDueMonth("");
            setInputDueDay("");
        } else if (inputFrequency.toLowerCase() === "monthly") {
            setInputDueMonth("");
        }

        if (inputFrequency.toLowerCase() === "quarterly" || inputFrequency.toLowerCase() === "yearly") {
            setPaidInInstallments(true);
        }
    }, [inputFrequency]);

    return (
        <div className="container bg-black min-vh-100 bg-opacity-75">

            {/*card to display and interact with existing bills*/}
            <div className="card text-muted">
                <h5 className="card-title mt-3">Manage Bills</h5>
                <div className="row">
                    <div className="col-11"></div>
                    <div className="col-1 p-0">
                        {toggle ?
                            <ChevronDoubleUp title="Collapse All"
                                             data-bs-toggle="collapse"
                                             data-bs-target=".billDetails"
                                             onClick={() => setToggle(!toggle)}
                            />
                            :
                            <ChevronDoubleDown title="Expand All"
                                               data-bs-toggle="collapse"
                                               data-bs-target=".billDetails"
                                               onClick={() => setToggle(!toggle)}
                            />
                        }
                    </div>
                </div>
                <div className="card-body">
                    <div className="accordion accordion-flush">
                        {
                            bills.map(bill => {
                                return (
                                    <BillAccordionItem bill={bill} key={"managebillsaccordion" + bill.id}/>
                                );
                            })
                        }
                    </div>
                </div>
            </div>

            {/*card to add new bills*/}
            <div className="card text-muted">
                <h5 className="card-title mt-3">Add Bill</h5>
                <div className="card-body d-grid">
                    <form>
                        <div className="row g-3">
                            <div className="col-xl-4">
                                <div className="input-group">
                                    <span className="card-text input-group-text">Description</span>
                                    <input type="text" className="card-text form-control"
                                           value={inputDescription}
                                           onInput={event => setInputDescription(event.currentTarget.value)}
                                           required
                                    />
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="input-group">
                                    <span className="card-text input-group-text">Amount</span>
                                    <input className="card-text form-control" type="number" value={inputAmount} required
                                           onInput={event => setInputAmount(event.currentTarget.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="input-group">
                                    <span className="card-text input-group-text">Frequency</span>
                                    <span className="dropdown">
                                    <input className="card-text form-control dropdown-toggle" placeholder="Select"
                                           type="text" data-bs-toggle="dropdown" value={inputFrequency} required
                                    />
                                    <ul className="dropdown-menu">
                                        {frequencyList.map(freq => {
                                            return (
                                                <li key={"anbfreqdd" + freq}
                                                    onClick={() => setInputFrequency(freq)}
                                                >
                                                    <Link to="" className="dropdown-item">{freq}</Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </span>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="input-group">
                                    <span className="card-text input-group-text">Due</span>
                                    <span className="dropdown">
                                        <input type="text" className="card-text form-control dropdown-toggle"
                                               data-bs-toggle="dropdown" value={inputDueMonth}
                                               placeholder="Month"
                                               disabled={inputFrequency.toLowerCase() !== "yearly"}
                                               required={inputFrequency.toLowerCase() === "yearly"}
                                        />
                                        <ul className="dropdown-menu">
                                            {getMonthArray().map(month => {
                                                return (
                                                    <li key={"anbduemonthdd" + month.num}
                                                        onClick={() => setMonth(month)}
                                                    >
                                                        <Link to="" className="dropdown-item">{month.name}</Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </span>
                                    <input type="number" min={1} max={month ? month.days : 31}
                                           className="card-text form-control" value={inputDueDay}
                                           placeholder="Day"
                                           disabled={
                                               !inputFrequency ||
                                               (inputFrequency.toLowerCase() === "yearly" && !month) ||
                                               inputFrequency.toLowerCase() === "quarterly" ||
                                               inputFrequency.toLowerCase() === "bi-weekly"
                                           }
                                           required={inputFrequency.toLowerCase() === "yearly" || inputFrequency.toLowerCase() === "monthly"}
                                           onInput={event => setInputDueDay(event.currentTarget.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div className="input-group">
                                    <span className="card-text input-group-text">Comment</span>
                                    <input type="text" className="card-text form-control" value={inputComment}
                                           required={false}
                                           onInput={event => setInputComment(event.currentTarget.value)}/>
                                </div>
                            </div>
                            <div className="col-xl-2">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch"
                                           id="switchPaidFromBudget"
                                           checked={paidFromBudget}
                                           onChange={() => setPaidFromBudget(!paidFromBudget)}
                                    />
                                    <label className="form-check-label" htmlFor="switchPaidFromBudget">Paid from
                                        Budget</label>
                                </div>
                            </div>
                            <div className="col-xl-2">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch"
                                           id="switchPaidInInstallments"
                                           checked={paidInInstallments}
                                           onChange={() => setPaidInInstallments(!paidInInstallments)}
                                    />
                                    <label className="form-check-label" htmlFor="switchPaidInInstallments">Paid In
                                        Installments</label>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="input-group">
                                    <span className="card-text input-group-text">Paid so Far</span>
                                    <input type="number" className="card-text form-control" value={inputPaidSoFar}
                                           disabled={!paidInInstallments}
                                           onInput={event => setInputPaidSoFar(event.currentTarget.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-2">
                                <input type="button"
                                       className='btn bg-black text-bg-primary w-100'
                                       value="Add"
                                    // onClick={() => handleSubmit()}
                                />
                            </div>
                            <div className="col-xl-2">
                                <input type="button"
                                       className='btn bg-black text-bg-primary w-100'
                                       value="Cancel"
                                    // onClick={() => clearFields()}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}