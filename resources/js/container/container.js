// https://medium.com/@magnusjt/ioc-container-in-nodejs-e7aea8a89600

export default class Container {
  constructor() {
    this.services = {};
  }

  /**
   * Registers a dependency. Dependencies registered with register("NameOfDependency", fn) can be referenced with this.NameOfDependency.
   * Dependencies are lazy loaded i.e. they are not resolved until requested with this.NameOfDependency
   * @param {string} name The name of the service being registered
   * @param {function} callback a function that takes a Container as a parameter and returns a service
   */
  register(name, callback) {
    Object.defineProperty(this, name, {
      get: () => {
        if (!this.services.hasOwnProperty(name)) {
          this.services[name] = callback(this);
        }

        return this.services[name];
      },
      configurable: true,
      enumerable: true
    });

    return this;
  }
}
