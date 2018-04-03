import React, { Component } from "react";
import { Chat } from "botframework-webchat";
import "./Bot.css";

export class Bot extends Component {
  render() {
    return (
      <div className="orders container">
        <div className="columns">
          <div class="column">
            <Chat
              directLine={{ secret: direct_line_secret }}
              user={{ id: "1", name: "seth" }}
            />
          </div>
        </div>
      </div>
    );
  }
}
