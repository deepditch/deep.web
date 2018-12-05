import { parseErrors } from "../helpers/errors";

export class AuthService {
  constructor(axios) {
    this.axios = axios;
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
   * Logs a user in
   * @param {string} email the user's email
   * @param {string} password the user's password
   */
  refresh(token) {
    return this.axios
      .post("/refresh", {
        token: token
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
        return response.data;
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }

  forgotPassword(email) {
    return this.axios
      .get(`/forgot-password?email=${email}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }

  resetPassword(email, password, token) {
    return this.axios
      .post("/reset-password", {
        email: email,
        password: password,
        password_confirmation: password,
        token: token
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
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
  register(userName, email, password, organizationName = null, invite_token=null) {
    return this.axios
      .post("/register", {
        name: userName,
        email: email,
        password: password,
        organization: organizationName,
        invite_token: invite_token
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }
}
