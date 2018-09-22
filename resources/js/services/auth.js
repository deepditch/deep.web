export default Axios =>
  class AuthService {
    constructor() {
      this._loggedIn = false;
    }

    get loggedIn() {
      return this._loggedIn;
    }

    login() {
      this._loggedIn = true;
      console.log(this._loggedIn);
    }

    logout() {
      this._loggedIn = false;
    }
  };
