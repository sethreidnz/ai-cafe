import React, { Component } from "react";
import "./Orders.css";

import { orders } from "./constants";
import { PageTitle } from "../components/PageTitle";

export class Orders extends Component {
  state = {
    hasLoaded: false,
    orders: orders
  };
  async componentDidMount() {}
  render() {
    const { hasLoaded, orders } = this.state;
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
                    <td>{order.time.toLocaleDateString()}, {order.time.toLocaleTimeString()}</td>
                    <td>{order.name}</td>
                    <td>{order.order}</td>
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
