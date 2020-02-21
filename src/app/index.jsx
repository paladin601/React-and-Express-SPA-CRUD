import React from 'react';
import { render } from 'react-dom';
import App from './components/app.jsx';
import { BrowserRouter as Router } from "react-router-dom";

render(
    <Router>
        <App />
    </Router>
    , document.getElementById("app"));