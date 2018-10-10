export class UsersService {
  constructor(axios) {
    this.axios = axios;
  }

  async getUsers() {
    return this.axios
      .get("/users")
      .then(response => {
        return Promise.resolve(response.data.data);
      })
      .catch(error => {
        throw error;
      });
  }
}
