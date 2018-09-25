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
        if (response.data.access_token)
          localStorage.setItem("token", response.data.access_token);

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
      .then(response => {
        return response;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
}
