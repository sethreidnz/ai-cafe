import React from "react";

export const Notification = ({ type, text }) => (
  <div class={`notification is-${type}`}>
    {text}
  </div>
);
