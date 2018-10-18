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
        throw error.response;
      });
  }

  async getInvites() {
    return this.axios
      .get("/user/invite")
      .then(response => {
        return Promise.resolve(response.data.data);
      })
      .catch(error => {
        throw error.response;
      });
  }

  /**
   * Invite a user
   * @param {string} email The users email we are inviting
   */
  inviteUser(email) {
    return this.axios
      .post("/user/invite/new", {
        email: email,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response;
      });
  }

  /**
   * Revoke an invite
   * @param {integer} id The invite id we are revoking
   */
  revokeInvite(invite_id) {
    return this.axios
      .post("/user/invite/revoke", {
        invite_id: invite_id,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response;
      });
  }
}
