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

  async verifyDamageReport(reports, damagesInImage) {
    console.log(reports);
    console.log(damagesInImage);
    return this.axios
      .post(`/road-damage/report/${reports[0].id}/edit`, {
        reports: reports,
        damagesInImage: damagesInImage
      })
      .then(response => {
        console.log('success');
        return Promise.resolve(response.data);
      })
      .catch(error => {
        console.log('error');
        throw parseErrors(error.response);
      });
  }

  async changeDamageStatus(id, status) {
    return this.axios
      .post(`/road-damage/${id}/edit`, {
        status: status
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error)
        throw parseErrors(error.response);
      });
  }
}
