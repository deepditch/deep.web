import { parseErrors } from "../helpers/errors";

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
        throw parseErrors(error.response);
      });
  }

  async getInvites() {
    return this.axios
      .get("/user-invite")
      .then(response => {
        return Promise.resolve(response.data.data);
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }

  /**
   * Invite a user
   * @param {string} email The users email we are inviting
   */
  async inviteUser(email) {
    return this.axios
      .post("/user-invite/new", {
        email: email
      })
      .then(response => {
        return response.data.data;
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }

  /**
   * Delete a user
   * @param {int} id of the user we are deleting
   */
  async deleteUser(id) {
    return this.axios
      .delete("/user/" + id)
      .then(response => {
        return response.data.data;
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }

  /**
   * Change role on user
   * @param {int} id of the user we are deleting
   */
  async changeRole(id) {
    return this.axios
      .get("/user/" + id + "/change-role")
      .then(response => {
        return response.data.data;
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }

  /**
   * Resend an invitation
   * @param {integer} inv_id The invite id we are resending
   */
  async resendInvite(inv_id) {
    return this.axios
      .get("/user-invite/" + inv_id + "/resend")
      .then(response => {
        return Promise.resolve(response.data.data);
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }

  /**
   * Revoke an invite
   * @param {integer} id The invite id we are revoking
   */
  async revokeInvite(inv_id) {
    return this.axios
      .get("/user-invite/" + inv_id + "/revoke")
      .then(response => {
        console.log(response);
        return Promise.resolve(response.data.data);
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }

  async getInviteData(token) {
    return this.axios
      .get(`/user-invite/${token}`)
      .then(response => {
        return Promise.resolve(response.data.data);
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }
}
