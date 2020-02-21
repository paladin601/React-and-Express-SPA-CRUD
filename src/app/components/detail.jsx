import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

class Detail extends Component {

    constructor(props) {

        super(props);
        this.state = {
            peoples: []
        };
        this.fetchPeoples();
    }



    editPeople(id) {
        this.props.history.push(`/edit/${id}`);
    }

    deletePeople(id) {
        if (confirm('Are you sure you want to delete it?')) {
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
                    this.fetchPeoples();
                });
        }
    }

    fetchPeoples() {
        fetch('/api/crud')
            .then(res => res.json())
            .then(data => {
                this.setState({ peoples: data });
                console.log(this.state.peoples);
            });
    }

    render() {
        return (
            <div className="card">
                <div className="table-responsive">
                    <link rel="stylesheet" href="modules/@fortawesome/fontawesome-free/css/all.min.css" />

                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col" className="text-center">Nombre</th>
                                <th scope="col" className="text-center">Apellido</th>
                                <th scope="col" className="text-center">Cedula</th>
                                <th scope="col" className="text-center">Edad</th>
                                <th scope="col" className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.peoples.map(people => {
                                    return (
                                        <tr key={people._id}>
                                            <td className="text-center">{people.name}</td>
                                            <td className="text-center">{people.lastName}</td>
                                            <td className="text-center">{people.ci}</td>
                                            <td className="text-center">{people.age}</td>
                                            <td className="d-flex justify-content-center">
                                                <button onClick={() => this.editPeople(people._id)} className="btn">
                                                    <i className="fa fa-pencil-alt text-light"></i>
                                                </button>
                                                <button onClick={() => this.deletePeople(people._id)} className="btn">
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
}

export default Detail;
