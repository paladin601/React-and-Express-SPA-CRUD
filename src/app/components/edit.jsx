import React, { useState, useEffect } from 'react';
import {
    useHistory
} from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default (props) => {
    const { t, i18n } = useTranslation();
    const [people, setPeople] = useState({
        name: '',
        lastName: '',
        email: '',
        age: '',
        _id: ''
    });
    let history = useHistory();

    const [regExp, setRegExp] = useState({
        name: /^[A-Z]+$/i,
        lastName: /^[A-Z]+$/i,
        email: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
        age: /^([0-9])*$/
    });
    const [error, setError] = useState({
        name: false,
        lastName: false,
        email: false,
        age: false
    });

    const fetchPeople = () => {
        fetch(`/api/crud/${window.location.pathname.split('/')[2]}`)
            .then(res => res.json())
            .then(data => {
                setPeople(data);
                console.log(people);
            });
    }

    useEffect(() => {
        fetchPeople();
    }, []);

    useEffect(() => {
        if (!error.name && !error.lastName && !error.email && !error.age) {
            $("#send").prop("disabled", false);
        } else {
            $("#send").prop("disabled", true);
        }
    }, [error]);

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

    function editPeople(event) {
        event.preventDefault();
        fetch(`/api/crud/${people._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: people.name,
                lastName: people.lastName,
                email: people.email,
                age: people.age,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                //window.M.toast({ html: 'People Updated' });
            });
        history.push("/detail");
    }

    return (
        <div className="card">
            <div className="card-header">
                {t('Form.2')}
            </div>
            <div className="card-body">
                <form onSubmit={() => editPeople(event)}>

                    <div className="form-group">
                        <label htmlFor="name">{t('Name.1')}</label>
                        <input name="name" id="name" className="form-control" onChange={() => handleChange(event)} type="text" value={people.name} autoFocus />
                        <div className="alert-error d-none" role="alert">
                            {t('Error.1')}
                        </div>

                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">{t('LastName.1')}</label>
                        <input name="lastName" id="lastName" className="form-control" onChange={() => handleChange(event)} type="text" value={people.lastName} />
                        <div className="alert-error d-none" role="alert">
                            {t('Error.2')}
                        </div>

                    </div>
                    <div className="form-group">
                        <label htmlFor="email">{t('Email.1')}</label>
                        <input type="email" name="email" id="email" className="form-control" onChange={() => handleChange(event)} value={people.email} />
                        <div className="alert-error d-none" role="alert">
                            {t('Error.3')}
                        </div>

                    </div>

                    <div className="form-group">
                        <label htmlFor="age">{t('Age.1')}</label>
                        <input type="number" name="age" id="age" className="form-control" onChange={() => handleChange(event)} value={people.age} readOnly />
                        <div className="alert-error d-none" role="alert">
                            {t('Error.4')}
                        </div>

                    </div>

                    <button type="submit" id="send" className="btn btn-success btn-lg btn-block">
                        {t('Send.1')}
                    </button>
                </form>
            </div>
        </div>
    )
}

