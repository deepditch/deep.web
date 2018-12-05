import { parseErrors } from "../helpers/errors";

export class TokensService {
  constructor(axios) {
    this.axios = axios;
  }

   getTokens() {
    return this.axios
      .get("/api-token")
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }

  /**
   * add a token
   * @param {name} name identifier for token
   */
  addToken(name) {
    return this.axios
      .post("/api-token/new", {
         name: name,
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }

  /**
   * delete token
   * @param {integer} delete_token_id
   */
  deleteToken(delete_token_id) {
    return this.axios
      .get("/api-token/" + delete_token_id + "/delete")
      .then(response => {
        return response.data.data;
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }
}
