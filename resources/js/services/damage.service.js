import { parseErrors } from "../helpers/errors";

export class DamageService {
  constructor(axios) {
    this.axios = axios;
  }

  async getDamageInstances() {
    return this.axios
      .get("/road-damage")
      .then(response => {
        return Promise.resolve(response.data.data);
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }
}
