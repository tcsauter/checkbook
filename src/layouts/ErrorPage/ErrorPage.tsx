import {useRouteError} from "react-router-dom";

export const ErrorPage = () => {
    const error: any = useRouteError();

    return (
        <div id="error-page" className="card bg-light vh-100">
            <h1 className="card-title mt-5">Oops!</h1>
            <p className="card-text text-center">Sorry, an unexpected error has occurred.</p>
            <p className="card-text text-center center">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}