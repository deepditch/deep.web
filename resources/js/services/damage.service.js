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

  async verifyDamageReport(id) {
    return this.axios
      .post(`/road-damage/report/${id}/edit`, {
        verified: "verified"
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw parseErrors(error.response);
      });
  }
}
