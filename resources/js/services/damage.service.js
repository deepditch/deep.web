export class MockRoadDamageService {
  async getDamageInstances() {
    return Promise.resolve([
      {
        position: {
          lat: 37.759703,
          lng: -122.428093
        },
        type: "D44"
      },
      {
        position: {
          lat: 37.778519,
          lng: -122.40564
        },
        type: "D01"
      }
    ]);
  }
}

export class RoadDamageService {
  constructor(axios) {
    this.axios = axios;
  }

  async getDamageInstances() {
    return this.axios
      .get("/road-damage")
      .then(response => {
        return [
          {
            position: {
              lat: 37.759703,
              lng: -122.428093
            },
            type: "D44"
          },
          {
            position: {
              lat: 37.778519,
              lng: -122.40564
            },
            type: "D01"
          }
        ];
      })
      .catch(error => {
        throw error;
      });
  }
}
