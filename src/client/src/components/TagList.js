import React from 'react';

export const TagList = ({ values }) => {
  return (
    values.map(values => 
      <div class="tags has-addons">
        <span class="tag">{values}</span>
      </div>
    )
  )
}