import { test, expect } from '@playwright/test';
import { ReqresAPI } from '../services/apiRequest'
import { API_URL as baseURL } from '../env';


test.describe('Reqres API Tests', () => {
  let api: ReqresAPI;
  let createdUserId: number;

  api = new ReqresAPI(baseURL);

  test('Create a user via POST request', async ({ request }) => {
    const userData = {
      name: 'TEST USER',
      job: 'Software Engineer',
    };
    const response = await api.createUser(request, userData);
    expect(userData).toMatchObject({
      name: response.name,
      job: response.job,
    });
    expect(response.id).toBeTruthy();
    createdUserId = response.id;
  });


  test('Update user via PUT request', async ({ request }) => {
    const updatedUser = {
      name: 'user test',
      job: 'QA Engineer',
    };
    const response = await api.updateUser(request, createdUserId, updatedUser);
    expect(response).toMatchObject(updatedUser);
  });


  test('Find user and delete by ID', async ({ request }) => {
    let userId = NaN;

    await test.step('Fetch all users', async () => {
      const allUsers = await api.fetchAllUsers(request);
      expect(allUsers.length).toBeGreaterThan(0);
      const user = allUsers.find(
        (u: { email: string }) => u.email === 'tobias.funke@reqres.in'
      );
      expect(user).toBeTruthy();
      userId = user.id;
    });

    await test.step('Delete user Tobias', async () => {
      await api.deleteUser(request, userId);
    });
  });
});
