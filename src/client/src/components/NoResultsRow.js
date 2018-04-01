import React from 'react';

export const NoResultsRow = ({text, colSpan}) => (
  <tr><td colSpan={colSpan}>{text}</td></tr>
)