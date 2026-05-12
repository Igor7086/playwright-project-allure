import { test, expect } from '@playwright/test';
import User from '../models/User';
import SignupPage from '../pages/SignupPage';
import TodoPage from '../pages/TodoPage';
import NewTodoPage from '../pages/NewTodoPage';

test.describe('Todo tests', () => {
	let newTodoPage: NewTodoPage;
	let todoPage: TodoPage;

	test.beforeEach(async ({ page, request, context }) => {
		const user = new User();
		const signupPage = new SignupPage();
		await signupPage.signupUsingAPI(request, user, context);
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