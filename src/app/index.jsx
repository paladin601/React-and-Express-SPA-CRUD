import React, { Suspense } from 'react';
import { render } from 'react-dom';
import App from './components/app.jsx';
import { BrowserRouter as Router } from "react-router-dom";
import './language/i18n';
render(

    <Router>
        <Suspense fallback={(<div>loading</div>)}>
            <App />
        </Suspense>
    </Router>
    , document.getElementById("app"));