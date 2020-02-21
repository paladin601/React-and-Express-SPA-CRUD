import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    useHistory
} from "react-router-dom";
export default () => {

    const { t, i18n } = useTranslation();
    const [people, setPeople] = useState({
        name: '',
        lastName: '',
        email: '',
        age: ''
    });
    const [regExp, setRegExp] = useState({
        name: /^[A-Z]+$/i,
        lastName: /^[A-Z]+$/i,
        email: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
        age: /^([0-9])*$/
    });
    const [error, setError] = useState({
        name: true,
        lastName: true,
        email: true,
        age: true
    });
    let history = useHistory();

    function handleChange(e) {
        let { name, value } = e.target;
        setPeople({
            ...people,
            [e.target.name]: e.target.value
        })
        let input = window.document.getElementById(name);
        let parent = input.parentNode;
        let label = parent.childNodes[0];
        let errorLabel = parent.childNodes[2];
        if (!regExp[name].test(value)) {
            $(input).addClass("input-error");
            $(label).addClass("alert-error");
            $(errorLabel).removeClass("d-none");
            setError({ ...error, [e.target.name]: true })
        } else {
            $(input).removeClass("input-error");
            $(label).removeClass("alert-error");
            $(errorLabel).addClass("d-none");
            setError({ ...error, [e.target.name]: false })
        }
    }

    useEffect(() => {
        if (!error.name && !error.lastName && !error.email && !error.age) {
            $("#send").prop("disabled", false);
        } else {
            $("#send").prop("disabled", true);
        }
    }, [error])

    function addPeople(event) {
        event.preventDefault();
        if (!error.name && !error.lastName && !error.email && !error.age) {
            fetch('/api/crud', {
                method: 'POST',
                body: JSON.stringify(people),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    //window.M.toast({ html: 'People Saved' });


                })
                .catch(err => console.error(err));
            history.push("/detail");
        } else {
            $("#send").prop("disabled", true);
        }
    }


    return (
        <div className="card">
            <div className="card-header">
                {t('Form.1')}
            </div>
            <div className="card-body">
                <form onSubmit={() => addPeople(event)}>

                    <div className="form-group">
                        <label htmlFor="name">{t('Name.1')}</label>
                        <input name="name" id="name" className="form-control" onChange={() => handleChange(event)} type="text" autoFocus />
                        <div className="alert-error d-none" role="alert">
                            {t('Error.1')}
                        </div>

                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">{t('LastName.1')}</label>
                        <input name="lastName" id="lastName" className="form-control" onChange={() => handleChange(event)} type="text" />
                        <div className="alert-error d-none" role="alert">
                            {t('Error.2')}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">{t('Email.1')}</label>
                        <input type="email" name="email" id="email" className="form-control" onChange={() => handleChange(event)} />
                        <div className="alert-error d-none" role="alert">
                            {t('Error.3')}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">{t('Age.1')}</label>
                        <input type="text" name="age" id="age" className="form-control" onChange={() => handleChange(event)} />
                        <div className="alert-error d-none" role="alert">
                            {t('Error.4')}
                        </div>
                    </div>

                    <button type="submit" id="send" className="btn btn-success btn-lg btn-block" disabled>
                        {t('Send.1')}
                    </button>
                </form>
            </div>
        </div>

    )

}

