import React from "react";

export const Navbar: React.FC = () => {
    return (
        <nav className={'navbar navbar-expand-md shadow navbar-dark'} style={{backgroundColor: "var(--bs-indigo)"}}>
            <div className='container-fluid'>
                <h3 className='navbar-brand'>NoArtist</h3>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-light" id="navbarSupportedContent">
                    <a className='nav-link active' aria-current='page' href='#'>Home</a>
                </div>
            </div>
        </nav>
    );
}