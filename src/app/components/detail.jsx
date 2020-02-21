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

    const fetchPeoples = () => {
        fetch('/api/crud')
            .then(res => res.json())
            .then(data => {
                window.document.getElementById("display").classList.remove('d-none');
                setPeople(data);
                console.log(peoples);
            });
    }

    useEffect(() => {
        fetchPeoples();
    }, []);

    function goToForm(event) {
        event.preventDefault();
        history.push(`/`);
    }

    function Table() {
        return (
            <div className="table-responsive">
                <link rel="stylesheet" href="modules/@fortawesome/fontawesome-free/css/all.min.css" />

                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">{t('Name.1')}</th>
                            <th scope="col" className="text-center">{t('LastName.1')}</th>
                            <th scope="col" className="text-center">{t('Email.1')}</th>
                            <th scope="col" className="text-center">{t('Phone.1')}</th>
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
                                        <td className="text-center">{people.phone}</td>
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
        )
    }

    function Error() {
        return (
            <div className="card p-4">
                <div className="alert alert-danger alert-dismissible">
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>{t('Message.2')}</strong>
                </div>
                <button className="btn btn-success btn-lg btn-block" onClick={() => goToForm(event)}>{t('Send.2')} </button>
            </div>
        )
    }
    return (
        <div id="display" className="d-none">
            {
                peoples.length > 0 ?
                    <Table />
                    :
                    <Error />
            }
        </div>
    )
}

