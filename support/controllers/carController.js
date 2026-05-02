
export default class CarController {
  constructor(request) {
    this.request = request;
  }

  async createCar(payload) {
    return this.request.post('/api/cars', {
      data: payload,
    });
  }
}
