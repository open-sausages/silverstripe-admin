import React from 'react';

const Row = ({ queryResult, children }) => (
  <tr key={Object.values(node).join('')}>
    {Object.values(node).map(children)}
  </tr>
);

Row.propTypes = {
  queryResult: React.PropTypes.object.isRequired,
  children: React.PropTypes.func.isRequired,
};

export default Row;