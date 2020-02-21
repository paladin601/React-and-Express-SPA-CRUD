import React, { Component } from 'react';


class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            ci: '',
            age: '',
            _id: ''
        };
        fetch(`/api/crud/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    name: data.name,
                    lastName: data.lastName,
                    ci: data.ci,
                    age: data.age,
                    _id: data._id
                });
            });
        this.handleChange = this.handleChange.bind(this);
        this.editPeople = this.editPeople.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    editPeople() {
        fetch(`/api/crud/${this.state._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: this.state.name,
                lastName: this.state.lastName,
                ci: this.state.ci,
                age: this.state.age,
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
        this.props.history.push(`/detail`);

    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Formulario
                </div>
                <div className="card-body">
                    <form onSubmit={this.editPeople}>

                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input name="name" id="name" className="form-control" onChange={this.handleChange} type="text" value={this.state.name}autoFocus />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Apellido</label>
                            <input name="lastName" id="lastName" className="form-control" onChange={this.handleChange} type="text" value={this.state.lastName}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ci">Cedula</label>
                            <input type="number" name="ci" id="ci" className="form-control" onChange={this.handleChange} value={this.state.ci} readOnly/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="age">Edad</label>
                            <input type="number" name="age" id="age" className="form-control" onChange={this.handleChange} value={this.state.age} readOnly/>
                        </div>

                        <button type="submit" className="btn btn-success btn-lg btn-block">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Edit;
