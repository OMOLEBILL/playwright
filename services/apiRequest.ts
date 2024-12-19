import { expect } from '@playwright/test';


export class ReqresAPI {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async createUser(request: any, userData: { name: string; job: string }) {
    const response = await request.post(`${this.baseURL}/users`, {
      data: userData,
    });
    const responseBody = await response.json();
    expect(response.ok()).toBeTruthy();
    return responseBody;
  }

  async updateUser(
    request: any,
    userId: number,
    updatedData: { name: string; job: string }
  ) {
    const response = await request.put(`${this.baseURL}/users/${userId}`, {
      data: updatedData,
    });
    const responseBody = await response.json();
    expect(response.ok()).toBeTruthy();
    return responseBody;
  }

  async fetchAllUsers(request: any) {
    const allUsers: any[] = [];
    let currentPage = 1;
    let totalPages = 1;
    do {
      const response = await request.get(`${this.baseURL}/users`, {
        params: { page: currentPage },
      });
      const responseBody = await response.json();
      allUsers.push(...responseBody.data);
      if (currentPage === 1) {
        totalPages = responseBody.total_pages;
      }
      currentPage++;
    } while (currentPage <= totalPages);
    return allUsers;
  }

  async deleteUser(request: any, userId: number) {
    const response = await request.delete(`${this.baseURL}/users/${userId}`);
    expect(response.status()).toBe(204);
  }
}

