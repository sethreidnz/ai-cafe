import React, { Component } from "react";
import moment from 'moment'
import { getAllOrders } from "../api/reservations";
import "./Orders.css";

import { PageTitle } from "../components/PageTitle";

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
          <div class="column">
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Pickup Time</th>
                  <th>Name</th>
                  <th>Order</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr>
                    <td>
                      {moment(order.pickupTime).format('MMMM Do YYYY, h:mm:ss a')}
                    </td>
                    <td>{order.name}</td>
                    <td>{order.item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
