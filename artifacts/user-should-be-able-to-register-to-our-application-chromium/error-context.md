# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user.spec.ts >> should be able to register to our application
- Location: tests/user.spec.ts:6:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid=welcome]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-testid=welcome]')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e4]:
    - img [ref=e5]
    - generic [ref=e6]:
      - link "Home" [ref=e7] [cursor=pointer]:
        - /url: /
      - link "Login" [ref=e8] [cursor=pointer]:
        - /url: /login
      - link "Signup" [ref=e9] [cursor=pointer]:
        - /url: /signup
  - generic [ref=e12]:
    - heading "Register to Application" [level=2] [ref=e13]
    - heading "Ready to mark some Todos as completed?" [level=2] [ref=e14]
    - generic [ref=e15]:
      - generic:
        - text: FirstName
        - generic: "*"
      - generic [ref=e16]:
        - textbox [ref=e17]: Ila
        - group
    - generic [ref=e18]:
      - generic:
        - text: LastName
        - generic: "*"
      - generic [ref=e19]:
        - textbox [ref=e20]: Beatty-Konopelski
        - group
      - paragraph [ref=e21]: Last Name is required, and it should be more than 3 characters
    - generic [ref=e22]:
      - generic:
        - text: Email
        - generic: "*"
      - generic [ref=e23]:
        - textbox [ref=e24]: Eliseo43@gmail.com
        - group
    - generic [ref=e25]:
      - generic:
        - text: Password
        - generic: "*"
      - generic [ref=e26]:
        - textbox [ref=e27]
        - group
    - generic [ref=e28]:
      - generic:
        - text: Confirm Password
        - generic: "*"
      - generic [ref=e29]:
        - textbox [ref=e30]
        - group
    - button "Signup" [active] [ref=e31] [cursor=pointer]:
      - generic [ref=e32]: Signup
    - separator [ref=e33]
    - heading "Do you have an Account?" [level=2] [ref=e34]
```

# Test source

```ts
  1  | import {test, expect} from '@playwright/test';
  2  | import User from '../models/User';
  3  | import SignupPage from '../pages/SignupPage.ts';
  4  | import TodoPage from '../pages/TodoPage.ts';
  5  | 
  6  | test('should be able to register to our application', async ({ page }) => {
  7  | 	const user = new User();
  8  | 	const signupPage = new SignupPage();
  9  | 	await signupPage.load(page);
  10 | 	await signupPage.signup(page, user);
  11 | 	const todoPage = new TodoPage();
  12 | 	const welcomeMessage = todoPage.getWelcomeMessageElement(page);
> 13 | 	await expect(welcomeMessage).toBeVisible();
     |                               ^ Error: expect(locator).toBeVisible() failed
  14 | });
```