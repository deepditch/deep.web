export class UsersService {
  constructor(axios) {
    this.axios = axios;
  }

  async getUsers() {
    return this.axios
      .get("/user")
      .then(response => {
        return Promise.resolve(response.data.data);
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Invite a user
   * @param {string} email The users email we are inviting
   */
  inviteUser(email) {
    return this.axios
      .post("/user/invite", {
        email: email,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }
}
