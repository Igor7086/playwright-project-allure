import { APIRequestContext } from '@playwright/test';
import User from '../models/User';
import config from '../playwright.config';

export default class TodoApi {
  async addTodo(request: APIRequestContext, user: User, task: string) {
    return await request.post('/api/v1/tasks', {
      data: {
        isCompleted: false,
        item: task,
      },
      headers: {
        Authorization: `Bearer ${user.getAccessToken()}`,
      },
    });
  }
}