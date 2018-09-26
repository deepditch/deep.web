export class AuthService {
  constructor(axios) {
    this.axios = axios;
  }

  /**
   * Returns true if the user is logged in and false otherwise
   */
  get loggedIn() {
    return !localStorage.getItem("token") === null;
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
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

  /**
   * Logs a user out
   */
  logout() {
    localStorage.removeItem("token");
  }

  /**
   * Registers a user
   * @param {string} name the user's username
   * @param {string} email the user's email
   * @param {bool} is organization true/false
   * @param {string} password the user's password
   */
  register(name, email, organization, password) {
    return this.axios
      .post("/register", {
        email: email,
        name: name,
        organization: organization,
        password: password
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
}
