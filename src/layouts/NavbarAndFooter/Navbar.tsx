import React from "react";

export const Navbar: React.FC = () => {
    return (
        <nav className={'navbar navbar-expand navbar-dark bg-black'}>
            <div className='container-fluid'>
                <h3 className='navbar-brand'>ChekBüq</h3>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className='navbar-nav'>
                        <a className='nav-link active' aria-current='page' href='#'>Home</a>
                        <a className='nav-link' href='#'>Bills</a>
                    </div>
                </div>
            </div>
        </nav>


);
}