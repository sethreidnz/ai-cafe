import React from "react";

export const Notification = ({ type, text }) => (
  <div className={`notification is-${type}`}>
    {text}
  </div>
);
