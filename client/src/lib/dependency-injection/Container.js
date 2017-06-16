import MiddlewareRegistry from './MiddlewareRegistry';
/**
 * Store of middleware registries
 * @type array
 */
const middlewareRegistries = {};

/**
 * A map of service names to factories
 * @type Object
 */
const container = {};

/**
 * When true, DI is blocked
 * @type {boolean}
 */
let initialised = false;

/**
 * Wrapper function to enforce frozen state of DI container
 * @param func
 * @returns function
 */
const protect = (func) => (...params) => {
  if (initialised) {
    throw new Error('Cannot mutate DI container after it has been initialised');
  }

  func(...params);
};

/**
 * Empties the state and restarts the injector. Should be used
 * only for testing purposes.
 */
const reset = (silent) => {
  if (!silent) {
    // eslint-disable-next-line no-console
    console.warn(`
      Injector.__reset__() should only be used in dev mode. Using
      this method in production will likely break.
    `);
  }
  [middlewareRegistries, container].forEach(o => {
    // eslint-disable-next-line no-param-reassign
    Object.keys(o).forEach(k => delete o[k]);
  });

  initialised = false;
};

/**
 * Applies a middleware function to compose an existing component
 * with new properties
 * @param meta An object of metadata
 * @param key The name of the dependency to customise
 * @param factory The function that will compose the dependency. Gets passed the
 *  previous state of composition
 */
const customise = (meta, key, factory) => {
  const [serviceName, ...context] = key.split('.');
  if (!middlewareRegistries[serviceName]) {
    middlewareRegistries[serviceName] = new MiddlewareRegistry(serviceName);
  }
  middlewareRegistries[serviceName].add(
    meta,
    factory,
    context
  );
};

/**
 * Register a dependency. This is the initial version of a dependency that will be
 * passed to the first link in the middleware chain (if any customisations exist)
 * @param key The name of the dependency to register
 * @param value The component to register
 * @param params
 */
const register = (key, value, params = {}) => {
  if (container[key] && params.force !== true) {
    throw new Error(`
      Tried to register service ${key} more than once. This practice is discouraged. Consider
      using Injector.update() to enhance the service rather than override it completely.
      Otherwise, invoke the register() function with { force: true } as the third argument.
     `);
  }
  // get() expects the service to be a function that accepts a context param,
  // so even if no middleware are registered, this still has to be a function.
  container[key] = () => value;
};

/**
 * Gets a dependency
 * @param key
 * @param context string A dot-separated context specification
 * @returns Component
 */
const get = (key, context) => {
  if (!initialised) {
    throw new Error(`
      Injector.get(): Attempted to access DI layer before it was initialised.
      Did you forget to invoke Injector.load()?`
    );
  }
  if (!container[key]) {
    throw new Error(`Injector.get(): Component ${key} does not exist`);
  }

  const service = container[key](context);
  if (service.displayName && service.displayName.match(/\]$/)) {
    return service;
  }

  let componentName = (service.displayName || service.name || 'Component');
  componentName += `[${key}`;
  if (context) {
    componentName += `.${context}`;
  }
  componentName += ']';
  service.displayName = componentName;

  return service;
};

/**
 * Updates the injector by callback. First parameter should contain
 * an object with keys for name, and (optional) "before" and "after" declarations
 * e.x.
 * Injector.transform('my-transformation-name', (update) => {
 *  update('SomeComponent', MyNewComponentCreator);
 * }, { before: 'another-transform' });
 * @param name The name of the transformation
 * @param callback
 * @param priorities An object mapping priorities for the loading order:
 *  { before: 'some-transformation', after: 'some-other-transformation' }
 */
const transform = (name, callback, priorities = {}) => {
  const meta = { name, ...priorities };
  callback(
    (key, wrapper, displayName) => {
      customise({ ...meta, displayName }, key, wrapper);
    }
  );
};

/**
 * Resolve all of the middleware constraints and freeze the DI layer
 */
const load = () => {
  Object.keys(middlewareRegistries)
    .filter(key => middlewareRegistries.hasOwnProperty(key))
    .forEach(key => {
      const registry = middlewareRegistries[key];
      registry.setService(container[key]());
      registry.sort();
      container[key] = (context) => registry.getFactory(context);
    });
  initialised = true;
};

// Public API
const Container = {
  get,
  load,
  transform: protect(transform),
  register: protect(register),
};
if (process.env.NODE_ENV !== 'production') {
  Container.__reset__ = reset;
}

export default Container;
