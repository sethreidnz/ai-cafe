import React, { Component } from "react";
import moment from 'moment'
import { getAllOrders } from "../api/reservations";
import "./Orders.css";

import { PageTitle } from "../components/PageTitle";
import { NoResultsRow } from "../components/NoResultsRow";

export class Orders extends Component {
  state = {
    hasLoaded: false,
    orders: null
  };
  async componentDidMount() {
    const orders = await getAllOrders();
    this.setState({
      hasLoaded: true,
      orders
    });
  }
  render() {
    const { hasLoaded, orders } = this.state;
    if (!hasLoaded) return <div />;
    return (
      <div className="orders container">
        <PageTitle text="Pending Orders" />
        <div className="columns">
          <div className="column">
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Pickup Time</th>
                  <th>Name</th>
                  <th>Order</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (orders.map(order => (
                  <tr>
                    <td>
                      {moment(order.pickupTime).format('MMMM Do YYYY, h:mm:ss a')}
                    </td>
                    <td>{order.name}</td>
                    <td>{order.item}</td>
                  </tr>
                ))) : (
                  <NoResultsRow
                    text="There are no orders yet"
                    colSpan={3}
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
