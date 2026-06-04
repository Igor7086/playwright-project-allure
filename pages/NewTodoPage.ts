import { APIRequestContext, Page } from '@playwright/test';
import TodoApi from '../apis/TodoApi';
import User from '../models/User';
import config from '../playwright.config';

export default class NewTodoPage {
  private get newTodoInput() {
    return '[data-testid=new-todo]';
  }

  private get newTodoSubmit() {
    return '[data-testid=submit-newTask]';
  }

  async load(page: Page) {
    await page.goto(`${config.use?.baseURL}/todo/new`);
  }

  async addTodo(page: Page, task: string) {
    await page.type(this.newTodoInput, task);
    await page.click(this.newTodoSubmit);
  }

  async addTodoUsingApi(request: APIRequestContext, user: User, task: string) {
    await new TodoApi().addTodo(request, user, task);
  }
}
