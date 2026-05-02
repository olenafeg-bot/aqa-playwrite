
import { test, expect } from '@playwright/test';
import CarController from '../support/controllers/carController.js';
import LoginAPI from '../support/pom/LoginAPI.js';

test('Create car. Positive scenario', async ({ request }) => {

  const loginResponse = await LoginAPI.apiLogin(
    request,
    'test1232@mailinator.com',
    'Capital123',
    true
  );

  expect(loginResponse.status()).toBe(200);

  const carController = new CarController(request);

  const payload = {
    carBrandId: 1,
    carModelId: 1,
    mileage: 122,
  };

  const response = await carController.createCar(payload);

  expect(response.status()).toBe(201);
   const body = await response.json();
    expect(body.data).toMatchObject({
      id: expect.any(Number),
      carBrandId: payload.carBrandId,
      carModelId: payload.carModelId,
      mileage: payload.mileage,
    });
    
});
test('Create car, incorrect data. Negative scenario', async ({ request }) => {

  const loginResponse = await LoginAPI.apiLogin(
    request,
    'test1232@mailinator.com',
    'Capital123',
    true
  );

  expect(loginResponse.status()).toBe(200);

  const carController = new CarController(request);

  const payload = {
    carBrandId: 1,
    carModelId: 1,
    mileage: "",
  };

  const response = await carController.createCar(payload);

  expect(response.status()).toBe(400);
   const body = await response.json();
    expect(body).toMatchObject({
      "status": "error",
      "message": "Invalid mileage type",
    });
  });
  test('Create car, incorrect values. Negative scenario', async ({ request }) => {

  const loginResponse = await LoginAPI.apiLogin(
    request,
    'test1232@mailinator.com',
    'Capital123',
    true
  );

  expect(loginResponse.status()).toBe(200);

  const carController = new CarController(request);

  const payload = {
    carBrandId: null,
    carModelId: 1,
    mileage: 4123,
  };

  const response = await carController.createCar(payload);

  expect(response.status()).toBe(400);
   const body = await response.json();
    expect(body).toMatchObject({
      "status": "error",
      "message": "Invalid car brand type",
    });
  });
