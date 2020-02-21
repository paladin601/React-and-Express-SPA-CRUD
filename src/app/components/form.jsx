import React, { useState } from 'react';
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
    let history = useHistory();

    function handleChange(e) {
        setPeople({
            ...people,
            [e.target.name]: e.target.value
        })
    }

    function addPeople(e) {

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
    }


    return (
        <div className="card">
            <div className="card-header">
                {t('Form.1')}
            </div>
            <div className="card-body">
                <form onSubmit={() => addPeople()}>

                    <div className="form-group">
                        <label htmlFor="name">{t('Name.1')}</label>
                        <input name="name" id="name" className="form-control" onChange={() => handleChange(event)} type="text" autoFocus />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">{t('LastName.1')}</label>
                        <input name="lastName" id="lastName" className="form-control" onChange={() => handleChange(event)} type="text" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">{t('Email.1')}</label>
                        <input type="email" name="email" id="email" className="form-control" onChange={() => handleChange(event)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">{t('Age.1')}</label>
                        <input type="number" name="age" id="age" className="form-control" onChange={() => handleChange(event)} />
                    </div>

                    <button type="submit" className="btn btn-success btn-lg btn-block">
                        {t('Send.1')}
                    </button>
                </form>
            </div>
        </div>

    )

}

