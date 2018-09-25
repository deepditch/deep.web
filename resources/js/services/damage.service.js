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
