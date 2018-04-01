import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "bulma/css/bulma.css";

import { Navbar } from "./components/Navbar";
import { Orders } from "./orders";

class App extends Component {
  state = {
    hasLoaded: false
  };
  async componentDidMount() {
    this.setState({
      hasLoaded: true
    });
  }
  render() {
    const { hasLoaded, cognitiveServicesConfig } = this.state;
    if (!hasLoaded) return <div />;
    return (
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <section>
            <div className="container">
              <Switch>
                <Redirect exact from="/" to="/orders" />
                <Route path="/orders" component={Orders} />
              </Switch>
            </div>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
