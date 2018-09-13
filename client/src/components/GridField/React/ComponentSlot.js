import React from 'react';
import { withInjector } from 'lib/Injector';

const ComponentSlot = ({ children, components, ...graphqlProps }, P context) => (
  components.map(c => {
    const Component = context.injector.get(c.component);
    const props = {
      ...graphqlProps,
      ...c.data,
    };
    return children(Component, props, c.component);
  })
);

ComponentSlot.propTypes = {
  components: React.PropTypes.array.isRequired,
  graphql: React.PropTypes.object.isRequired,
  variables: React.PropTypes.object,
  queryResult: React.PropTypes.object,
  children: React.PropTypes.func.isRequired,
};

ComponentSlot.defaultProps = {
  children: (Component, props, name) => <Component key={name} {...props} />
};

export default withInjector(ComponentSlot);