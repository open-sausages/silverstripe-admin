import React from 'react';
import { inject } from 'lib/Injector';

class ReactGridField extends React.Component {
  getChildContext() {
    return {
      queryResult: this.props.queryResult,
      graphql: this.props.graphql,
    };
  }

  render() {
    const { queryResult, graphql, BeforeComponents, HeaderComponents, AfterComponents } = this.props;
    return (
      <div>
        <BeforeComponents {...graphql} />
        {graphql.loading && <h3>Loading....</h3>}
        <table width="80%">
          <HeaderComponents {...graphql} />
          <tbody>
            {queryResult && queryResult.edges.map(({ node }) => (
              <tr key={Object.values(node).join('')}>
                {Object.values(node).map(col => (
                  <td style={{ padding: '4px', border: '1px solid' }} key={col}>{col}</td>
              ))}
              </tr>
          ))}
          </tbody>
        </table>
        <AfterComponents {...graphql} />
      </div>
    );
  }
}

ReactGridField.childContextTypes = {
  queryResult: React.PropTypes.object,
  graphql: React.PropTypes.object
};

export default inject(
  [
    'GridFieldBeforeComponents',
    'GridFieldAfterComponents',
    'GridFieldHeaderComponents',
  ],
  (BeforeComponents, AfterComponents, HeaderComponents) => ({
    BeforeComponents,
    AfterComponents,
    HeaderComponents,
  }),
  (props, context) => `${context}.${props.name}`
)(ReactGridField);
