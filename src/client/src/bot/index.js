import React, { Component } from "react";
import "./Bot.css";

import { PageTitle } from "../components/PageTitle";

export class Bot extends Component {
  state = {
    hasLoaded: false
  };
  async componentDidMount() {}
  render() {
    const { hasLoaded } = this.state;
    return (
      <div className="orders container">
        <PageTitle text="Pending Orders" />
        <div className="columns">
          <div class="column">
          </div>
        </div>
      </div>
    );
  }
}
