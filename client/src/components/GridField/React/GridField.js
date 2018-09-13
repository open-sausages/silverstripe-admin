import React from 'react';
import { withInjector } from 'lib/Injector';
import { compose } from 'redux';
import fieldHolder from 'components/FieldHolder/FieldHolder';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class GridField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      variables: this.props.data.graphqlVariables
    };
    this.updateVariables = this.updateVariables.bind(this);
    this._query = gql(this.props.data.graphqlQuery);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.graphqlQuery !== this.props.query) {
      this._query = gql(nextProps.data.graphqlQuery);
    }
  }

  updateVariables(variables) {
    this.setState({
      variables: {
        ...this.state.variables,
        ...variables,
      }
    });
  }

  renderComponent(component, gridFieldProps, extraProps = {}) {
    const Component = this.context.injector.get(component.name);

    return <Component gridField={gridFieldProps} data={component.data} {...extraProps} />;
  }

  render() {
    const {
      data: { queryName, components },
    } = this.props;

    return (
      <Query query={this._query} variables={this.state.variables}>
        {(graphql) => {
          const { loading, data } = graphql;
          const queryResult = data[queryName];

          if (!queryResult) return <h3>Loading...</h3>;

          const gridFieldProps = {
            graphql,
            variables: this.state.variables,
            queryResult,
            queryName,
            QUERY: this._query,
            updateVariables: this.updateVariables,
          };

          const beforeComponents = components.filter(c => c.position === 'before');
          const afterComponents = components.filter(c => c.position === 'after');
          const headerComponents = components.filter(c => c.position === 'header');
          const rowComponents = components.filter(c => c.position === 'row');

          return (
            <div style={{ opacity: loading ? 0.5 : 1 }}>
              <div className="gridfield-before-components">
                {beforeComponents.map(component => (
                  <div key={component.name}>{this.renderComponent(component, gridFieldProps)}</div>
                ))}
              </div>
              <table width="80%">
                <thead>
                  <tr>
                    {headerComponents.map(component => (
                      <th key={component.name}>{this.renderComponent(component, gridFieldProps)}</th>
                    ))}
                    {rowComponents.map(component => <th key={component.name} />)}
                  </tr>
                </thead>
                <tbody>
                {queryResult.edges.map(({node}) => {
                  const entries = Object.entries(node);
                  const key = entries.reduce((acc, curr) => {
                    const [column, value] = curr;
                    return `${acc}-${column}-${value}`;
                  }, '');
                  return (
                    <tr key={key}>
                      {entries.map(entry => {
                        const [column, value] = entry;
                        return <td style={{padding: '4px', border: '1px solid'}} key={`${column}-${value}`}>{value}</td>
                      })}
                      {rowComponents.map(component => (
                        <td key={component.name}>
                          {this.renderComponent(component, gridFieldProps, { node })}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                </tbody>
              </table>
              <div className="gridfield-after-components">
                {afterComponents.map(component => (
                  <div key={component.name}>{this.renderComponent(component, gridFieldProps)}</div>
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

GridField.defaultProps = {
  beforeComponents: [],
  afterComponents: [],
  headerComponents: [],
};

GridField.propTypes = {
  beforeComponents: React.PropTypes.array,
  afterComponents: React.PropTypes.array,
  headerComponents: React.PropTypes.array,
};

export default compose(
  fieldHolder,
  withInjector,
)(GridField);
