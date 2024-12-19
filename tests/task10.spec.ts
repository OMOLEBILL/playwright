import { test, expect } from '@playwright/test';
import { API_URL as baseURL } from '../env'; 


test.describe('Reqres API Tests', () => {
  let createdUserId: number;

  test('Create a user via POST request', async ({ request }) => {
    const userData = {
      name: 'TEST USER',
      job: 'Software Engineer'
    }
    const response = await request.post(`${baseURL}/users`, {
      data: userData,
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();

    expect(userData).toMatchObject({
      name : responseBody.name,
      job: responseBody.job
    })

    expect(responseBody.id).toBeTruthy(); 
    createdUserId = responseBody.id;
  });

  test('Update user via PUT request', async ({ request }) => {
    const updatedUser = {
      id : createdUserId,
      name : 'user test',
      job : 'QA Engineer',
    }
    const response = await request.put(`${baseURL}/users/${createdUserId}`, {
      data: updatedUser
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    
    expect(responseBody).toMatchObject(updatedUser);
  });

  test('Find user and delete by ID', async ({ request }) => {
    const allUsers: any[] = [];
    let userId = null;
    await test.step('Fetch all users', async () => {
      let currentPage = 1;
      let totalPages = 1;
      do {
          const response = await request.get(`${baseURL}/users`, {
            params: { page: currentPage },
          })
          expect(response.ok()).toBeTruthy();
          const responseBody = await response.json();
          allUsers.push(...responseBody.data);
          if (currentPage === 1) {
            totalPages = responseBody.total_pages;
          }
          currentPage++; 
      } while (currentPage <= totalPages);

      expect(allUsers.length).toBeGreaterThan(0);
    });
    
    await test.step('Find user Tobias', async () => {
      const user = allUsers.find((u: { email: string }) => u.email === 'tobias.funke@reqres.in');
      expect(user).toBeTruthy();
      userId = user.id;
    });

    await test.step('Delete user Tobias', async () => {
      const deleteResponse = await request.delete(`${baseURL}/users/${userId}`);
      expect(deleteResponse.status()).toBe(204); 
    });

  });
});
