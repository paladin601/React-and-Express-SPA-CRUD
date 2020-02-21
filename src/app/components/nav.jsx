import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default () => {
    return (


        <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Formulario</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/detail" className="nav-link">Detalles</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}