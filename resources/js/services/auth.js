export default class AuthService {
  constructor(axios) {
    this.axios = axios;
  }

  /**
   * Returns true if the user has logged in and false otherwise
   */
  get loggedIn() {
    return !localStorage.getItem("user") === null;
  }

  /**
   * Logs a user in
   * @param {string} email the user's email
   * @param {string} password the user's password
   */
  login(email, password) {
    return this.axios
      .post("/login", {
        email: email,
        password: password
      })
      .then(function(response) {
        if (response.access_token)
          localStorage.setItem("user", JSON.stringify(response));

        return response;
      })
      .catch(function(error) {
        console.error(error);
        return error;
      });
  }

  /**
   * Logs a user out
   */
  logout() {
    localStorage.removeItem("user");
  }

  /**
   * Registers a user
   * @param {string} name the user's username
   * @param {string} email the user's email
   * @param {string} password the user's password
   */
  register(name, email, password) {
    return this.axios
      .post("/register", {
        email: email,
        name: name,
        password: password
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.error(error);
        return error;
      });
  }
}
