import React from 'react';

const GridFieldComponentSlot = ({ components }) => (
  <div>
    {components.map((Component, i) => (
      <Component key={i} />
      ))}
  </div>
  );

GridFieldComponentSlot.defaultProps = {
  components: []
};

export default GridFieldComponentSlot;
