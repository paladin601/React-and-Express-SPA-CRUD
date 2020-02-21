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


    function handleChange(e) {
        const { name, value } = e.target;
        setPeople({
            ...people,
            [e.target.name]: e.target.value
        })
    }

    function editPeople() {
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
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">{t('LastName.1')}</label>
                        <input name="lastName" id="lastName" className="form-control" onChange={() => handleChange(event)} type="text" value={people.lastName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">{t('Email.1')}</label>
                        <input type="email" name="email" id="email" className="form-control" onChange={() => handleChange(event)} value={people.email} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">{t('Age.1')}</label>
                        <input type="number" name="age" id="age" className="form-control" onChange={() => handleChange(event)} value={people.age} readOnly />
                    </div>

                    <button type="submit" className="btn btn-success btn-lg btn-block">
                        {t('Send.1')}
                    </button>
                </form>
            </div>
        </div>
    )
}

