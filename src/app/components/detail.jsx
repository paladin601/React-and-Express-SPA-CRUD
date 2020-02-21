import React, { useEffect, useState } from 'react';
import {
    useHistory 
} from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default () => {
    const { t, i18n } = useTranslation();
    const [peoples, setPeople] = useState([])
    let history = useHistory();

    function editPeople(event, id) {
        history.push(`/edit/${id}`);
    }

    function deletePeople(event, id) {
        if (confirm(t('Message.1'))) {
            fetch(`/api/crud/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    //M.toast({ html: 'People deleted' });
                    fetchPeoples();
                });
        }
    }

    const fetchPeoples =  () => {
        fetch('/api/crud')
            .then(res => res.json())
            .then(data => {
                setPeople(data);
                console.log(peoples);
            });
    }

    useEffect(() => {
        fetchPeoples();
    }, []);
    
    return (
        <div className="card">
            <div className="table-responsive">
                <link rel="stylesheet" href="modules/@fortawesome/fontawesome-free/css/all.min.css" />

                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">{t('Name.1')}</th>
                            <th scope="col" className="text-center">{t('LastName.1')}</th>
                            <th scope="col" className="text-center">{t('Email.1')}</th>
                            <th scope="col" className="text-center">{t('Age.1')}</th>
                            <th scope="col" className="text-center">{t('Actions.1')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            peoples.map(people => {
                                return (
                                    <tr key={people._id}>
                                        <td className="text-center">{people.name}</td>
                                        <td className="text-center">{people.lastName}</td>
                                        <td className="text-center">{people.email}</td>
                                        <td className="text-center">{people.age}</td>
                                        <td className="d-flex justify-content-center">
                                            <button onClick={() => editPeople(event, people._id)} className="btn">
                                                <i className="fa fa-pencil-alt text-light"></i>
                                            </button>
                                            <button onClick={() => deletePeople(event, people._id)} className="btn">
                                                <i className="fa fa-times text-danger"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}

