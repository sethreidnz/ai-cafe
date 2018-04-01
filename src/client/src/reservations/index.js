import React, { Component } from "react";
import { getAllReservations } from "../api/reservations";
import "./Reservations.css";

import { PageTitle } from "../components/PageTitle";
import { NoResultsRow } from "../components/NoResultsRow";

export class Reservations extends Component {
  state = {
    hasLoaded: false,
    reservations: null
  };
  async componentDidMount() {
    const reservations = await getAllReservations();
    this.setState({
      hasLoaded: true,
      reservations
    });
  }
  render() {
    const { hasLoaded, reservations } = this.state;
    if (!hasLoaded) return <div />;
    return (
      <div className="orders container">
        <PageTitle text="Reservations" />
        <div className="columns">
          <div class="column">
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Group Size</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {reservations.length > 0 ? reservations.map(reservation => (
                  <tr>
                    <td>{reservation.name}</td>
                    <td>{reservation.groupSize}</td>
                    <td>
                      {reservation.date.toLocaleDateString()},{" "}
                      {reservation.date.toLocaleTimeString()}
                    </td>
                  </tr>
                )): <NoResultsRow text="There are no reservations yet" colSpan={3} />}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
