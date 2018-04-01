import React from "react";
import './PageTitle.css';

export const PageTitle = ({ text }) => (
  <header className="page-header">
    <h1 className="title is-1">{text}</h1>
  </header>
);
