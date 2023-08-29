import {useRouteLoaderData} from "react-router-dom";
import BillModel from "../../models/BillModel";
import {BillAccordionItem} from "./components/BillAccordionItem";
import {updateBill} from "../../utils/billUtil";
import {ChevronDoubleDown, ChevronDoubleUp} from "react-bootstrap-icons";
import {useState} from "react";

export async function action({request}: { request: any }) {
    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "update") {
        const bill = JSON.parse(formData.get("bill"));

        await updateBill(bill);
        return null;
    }
}

export const BillsPage = () => {
    const {bills} = useRouteLoaderData("root") as { bills: BillModel[] }

    const [toggle, setToggle] = useState(false);

    return (
        <div className="container bg-black min-vh-100 bg-opacity-75">
            <div className="card text-muted">
                <div className="card-title">
                    <h1>Manage Bills</h1>
                </div>
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
        </div>
    );
}