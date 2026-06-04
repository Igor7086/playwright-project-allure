import { test, expect, request as playwrightRequest } from '@playwright/test';
import User from '../models/User';
import SignupPage from '../pages/SignupPage';
import TodoPage from '../pages/TodoPage';
import NewTodoPage from '../pages/NewTodoPage';
import config from '../playwright.config';

test.describe('Todo tests', () => {
  let newTodoPage: NewTodoPage;
  let todoPage: TodoPage;
  let apiContext;

  test.beforeEach(async ({ page, context }) => {
    // ✅ create APIRequestContext with baseURL
    apiContext = await playwrightRequest.newContext({
      baseURL: config.use?.baseURL,
    });

    const user = new User();
    const signupPage = new SignupPage();
    await signupPage.signupUsingAPI(apiContext, user, context);

    newTodoPage = new NewTodoPage();
    await newTodoPage.load(page);
    todoPage = new TodoPage();
  });

  test('should be able to add a new todo', async ({ page }) => {
    await newTodoPage.addTodo(page, 'Learn Playwright!');
    const todoItem = await todoPage.getTodoItem(page);
    await expect(todoItem).toHaveText('Learn Playwright!');
  });

  test('should be able to delete a new todo', async ({ page }) => {
    await newTodoPage.addTodo(page, 'Hello TypeScript!');
    await todoPage.deleteTodo(page);
    const noTodosMessage = await todoPage.getNoTodosMessage(page);
    await expect(noTodosMessage).toBeVisible();
  });
});
