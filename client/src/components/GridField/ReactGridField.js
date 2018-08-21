import React from 'react';
import { withInjector } from 'lib/Injector';
import { compose } from 'redux';
import fieldHolder from 'components/FieldHolder/FieldHolder';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class ReactGridField extends React.Component {

  render() {
    const {
      data: { graphqlQuery, queryName, components, graphqlVariables },
    } = this.props;

    return (
      <Query query={gql(graphqlQuery)} variables={graphqlVariables}>
        {(graphql) => {
          const { loading, data } = graphql;
          const queryResult = data[queryName];
          const renderComponent = ({component}) => {
            const Component = this.context.injector.get(component);
            return (
              <Component
                key={component}
                graphql={graphql}
                variables={graphqlVariables}
                queryResult={queryResult}
              />
            );
          };


          return (
            <div>
              <div className="gridfield-before-components">
                {components.filter(c => c.position === 'before').map(renderComponent)}
              </div>
              {loading && <h3>Loading....</h3>}
              <table width="80%">
                <thead>
                {components.filter(c => c.position === 'header').map(renderComponent)}
                </thead>
                <tbody>
                {!loading && queryResult && queryResult.edges.map(({node}) => (
                  <tr key={Object.values(node).join('')}>
                    {Object.values(node).map(col => (
                      <td style={{padding: '4px', border: '1px solid'}} key={col}>{col}</td>
                    ))}
                  </tr>
                ))}
                </tbody>
              </table>
              <div className="gridfield-after-components">
                {components.filter(c => c.position === 'after').map(renderComponent)}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

ReactGridField.defaultProps = {
  beforeComponents: [],
  afterComponents: [],
  headerComponents: [],
};

ReactGridField.propTypes = {
  beforeComponents: React.PropTypes.array,
  afterComponents: React.PropTypes.array,
  headerComponents: React.PropTypes.array,
};

export default compose(
  fieldHolder,
  withInjector,
)(ReactGridField);
