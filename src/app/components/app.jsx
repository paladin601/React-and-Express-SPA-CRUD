
import React, { Component } from 'react';
import Nav from './nav.jsx';
import {
  Switch,
  Route
} from "react-router-dom";
import Form from './form.jsx';
import Detail from './detail.jsx';
import Edit from './edit.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <Switch>
                  <Route path="/edit/:id" component={Edit} />
                  <Route path="/detail" component={Detail} />
                  <Route path="/" component={Form} />
                </Switch>
              </div>
            </div>
          </div>
        </div >
      </div>
    )
  }
}

export default App;