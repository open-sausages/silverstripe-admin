import Injector from '../Injector';
import getIn from 'redux-form/lib/structure/plain/getIn';
import setIn from 'redux-form/lib/structure/plain/setIn';
import SchemaStateManager from './SchemaStateManager';

export default (reducer) => (state, action) => {
  const reducedState = reducer(state, action);
  if (!action.meta || !action.meta.form) {
    return reducedState;
  }

  const formName = action.meta.form;
  const formStateMiddleware = Injector.get('FormStateMiddleware', formName);
  const formSchemaMiddleware = Injector.get('FormSchemaMiddleware', formName);

  if (!formStateMiddleware && !formSchemaMiddleware) {
    return reducedState;
  }

  const formState = getIn(reducedState.formState, formName);
  if (!formState) {
    return reducedState;
  }
  const schemaKey = Object.keys(reducedState.formSchemas).find(k => (
    reducedState.formSchemas[k].name === formName)
  );

  if (!schemaKey) {
    return reducedState;
  }
  const schema = reducedState.formSchemas[schemaKey];
  const schemaState = schema.state;
  const manager = new SchemaStateManager(schemaState, formState);
  let newState = {
    ...reducedState,
  };
  // if (formStateMiddleware) {
  //   const updates = formStateMiddleware(currentFormStateValues, currentSchemaState);
  //   newState = setIn(newState, `formState.${formName}.values`, {
  //     ...currentFormStateValues,
  //     ...updates,
  //   });
  // }

  if (formSchemaMiddleware) {
    const updates = formSchemaMiddleware(formState.values, manager);
    newState = setIn(newState, `formSchemas.${schemaKey}.state`, {
      ...schemaState,
      ...updates,
    });
  }

  return newState;
};
