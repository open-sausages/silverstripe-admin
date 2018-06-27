import React from 'react';

const GridFieldHeaderComponentSlot = ({ components }) => (
  <thead>
    {components.map((Component, i) => (
      <Component key={i} />
    ))}
  </thead>
  );

GridFieldHeaderComponentSlot.defaultProps = {
  components: []
};

export default GridFieldHeaderComponentSlot;
