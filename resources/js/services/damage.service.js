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
              lat: 42.357233,
              lng: -83.066589
            },
            type: "D44"
          },
          {
            position: {
              lat: 42.357865,
              lng: -83.067749
            },
            type: "D01"
          },
          {
            position: {
              lat: 42.356315,
              lng: -83.072097
            },
            type: "D00"
          },
          {
            position: {
              lat: 42.354520,
              lng: -83.068457
            },
            type: "D01"
          },
          {
            position: {
              lat: 42.358807,
              lng: -83.068263
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
