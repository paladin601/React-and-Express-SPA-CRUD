import React from 'react';
import {
    Link
} from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default () => {
    const { t, i18n } = useTranslation();

    function handleClick(event,language){
        event.preventDefault();
        i18n.changeLanguage(language);
    }
    return (


        <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">{t('Form.1')} </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/detail" className="nav-link">{t('Details.1')} </Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a id="language" className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {t('En.1')} <span className="caret"></span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="language">
                            <a className="dropdown-item" onClick={()=>handleClick(event,'en')} >En</a>
                            <a className="dropdown-item" onClick={()=>handleClick(event,'es')} >Es</a>

                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}