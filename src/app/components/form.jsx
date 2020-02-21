import React, { Component } from 'react';


class Form extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            lastName: '',
            ci: '',
            age: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    addTask() {
        fetch('/api/crud', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                //window.M.toast({ html: 'Task Saved' });
                this.setState({
                    name: '',
                    lastName: '',
                    ci: '',
                    age: ''
                });
                this.fetchTasks();
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Formulario
                </div>
                <div className="card-body">
                    <form onSubmit={this.addTask}>

                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input name="name" id="name" className="form-control" onChange={this.handleChange} type="text" autoFocus />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Apellido</label>
                            <input name="lastName" id="lastName" className="form-control" onChange={this.handleChange} type="text" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ci">Cedula</label>
                            <input type="number" name="ci" id="ci" className="form-control" onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="age">Edad</label>
                            <input type="number" name="age" id="age" className="form-control" onChange={this.handleChange} />
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

export default Form;
