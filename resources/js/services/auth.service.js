import { parseErrors } from "../helpers/errors";

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
        throw parseErrors(error.response);
      });
  }

  /**
   * Logs a user out
   */
  logout() {
    this.axios
      .get("/logout")
      .then(response => {
        localStorage.removeItem("token");
        return response.data;
      })
      .catch(error => {
        console.log(error.response);
        throw parseErrors(error.response);
      });
  }

  /**
   * Registers a user or a user and an organization simultaneously
   * @param {string} userName the user's username
   * @param {string} email the user's email
   * @param {string} password the user's password
   * @param {string} organizationName the organization's name, null if an organization is not being registered
   */
  register(userName, email, password, organizationName = null) {
    return this.axios
      .post("/register", {
        name: userName,
        email: email,
        password: password,
        organization: organizationName
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }
}
