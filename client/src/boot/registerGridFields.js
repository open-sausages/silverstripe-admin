import Config from 'lib/Config';
import Injector, { graphqlTemplates, injectGraphql, inject } from 'lib/Injector';

const registerGridFields = () => {
  Config.get('gridFieldQueries').forEach(gridFieldQuery => {
    const { name, fields, components } = gridFieldQuery;
    const query = {
      apolloConfig: {
        props({ data }) {
          return {
            queryResult: data[`readGridField${name}`],
            graphql: data,
          };
        }
      },
      templateName: graphqlTemplates.READ,
      pluralName: `GridField${name}`,
      pagination: true,
      params: {},
      fields,
    };

    const queryName = `${name}Query`;
    Injector.query.register(queryName, query);
    Injector.transform(
      `gridfield-graphql-${name}`,
      (updater) => {
        const context = `ReactGridField.${name}`;
        const componentNames = components.map(c => c.component).join('.');
        updater.component(context, injectGraphql(queryName, `${context}.${componentNames}`));
      }
    );
    Injector.transform(
      `gridfield-${name}-components`,
      (updater) => {
        ['Before', 'Header', 'After'].forEach(key => {
          const appliedComponents = components
            .filter(c => c.position === key.toLowerCase())
            .map(c => c.component);
          updater.component(
            `GridField${key}Components.${name}`,
            inject(
              appliedComponents,
              (...injectedComponents) => ({
                components: injectedComponents,
              })
            )
          );
        });
      }
    );
  });
};

export default registerGridFields;

// load the queries into injector
