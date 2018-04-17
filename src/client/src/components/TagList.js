import React from 'react';

export const TagList = ({ values }) => {
  return (
    values.map(values => 
      <div className="tags has-addons">
        <span className="tag">{values}</span>
      </div>
    )
  )
}