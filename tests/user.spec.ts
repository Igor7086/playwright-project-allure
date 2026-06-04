import { test, expect } from '@playwright/test';
import User from '../models/User';
import TodoSignupPage from '../pages/TodoSignupPage';
import SignupPage from '../pages/SignupPage';
import TodoPage from '../pages/TodoPage';

test('should be able to register to our application', async ({ page }) => {
  const user = new User();

  const todoSignupPage = new TodoSignupPage();
  await todoSignupPage.load(page);
  await todoSignupPage.clickSignup(page);

  const signupPage = new SignupPage();
  await signupPage.signup(page, user);

  const todoPage = new TodoPage();
  const welcomeMessage = todoPage.getWelcomeMessageElement(page);
  await expect(welcomeMessage).toBeVisible();
});
