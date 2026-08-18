import { APIRequestContext, expect } from '@playwright/test';

export type TestCustomer = {
  firstName: string;
  lastName: string;
  postalCode: string;
  email: string;
};

export class TestDataApi {
  constructor(private request: APIRequestContext) {}

  async createCustomer(): Promise<TestCustomer> {

    console.log('Creating customer via API');

    const response = await this.request.post(
      'https://jsonplaceholder.typicode.com/users',
      {
        data: {
          name: 'Shipra Majumdar',
          email: `shipra.${Date.now()}@example.com`
        }
      }
    );

    console.log('Status:', response.status());

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    console.log('Response:', body);

    return {
      firstName: 'Shipra',
      lastName: 'Majumdar',
      postalCode: '700001',
      email: body.email
    };
  }
}