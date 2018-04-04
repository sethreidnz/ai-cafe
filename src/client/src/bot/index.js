import React, { Component } from "react";
import { Chat } from "botframework-webchat";
import "./Bot.css";

const directLineSecret = process.env.REACT_APP_DIRECT_LINE;

export class Bot extends Component {
  render() {
    return (
      <div className="bot container">
        <div className="columns">
          <div className="column">
            <Chat
              directLine={{ secret: directLineSecret }}
              user={{ id: "1", name: "seth" }}
            />
          </div>
        </div>
      </div>
    );
  }
}
