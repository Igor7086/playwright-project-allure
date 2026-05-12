# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: todo.spec.ts >> should be able to delete a todo
- Location: tests/todo.spec.ts:19:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-testid=delete]')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e4]:
    - img [ref=e5]
    - generic [ref=e6]:
      - link "Home" [ref=e7] [cursor=pointer]:
        - /url: /
      - link "Todo" [ref=e8] [cursor=pointer]:
        - /url: /todo
      - button "Logout" [ref=e9] [cursor=pointer]:
        - generic [ref=e10]: Logout
  - generic [ref=e13]:
    - heading "Good morning Osborne" [level=2] [ref=e14]
    - generic [ref=e15]:
      - button "delete" [ref=e16] [cursor=pointer]:
        - img [ref=e18]
      - heading "Add a new Todo" [level=2] [ref=e20]
    - heading "No Available Todos" [level=4] [ref=e21]
```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | 
  3  | export default class TodoPage {
  4  | 	private get welcomeMessage() {
  5  | 		return `[data-testid=welcome]`;
  6  | 	}
  7  | 
  8  | 	private get deleteIcon() {
  9  | 		return '[data-testid=delete]';
  10 | 	}
  11 | 
  12 | 	private get noTodosMessage() {
  13 | 		return '[data-testid=no-todos]';
  14 | 	}
  15 | 
  16 | 	private get todoItem() {
  17 | 		return '[data-testid=todo-item]';
  18 | 	}
  19 | 
  20 | 	async load(page: Page) {
  21 | 		await page.goto('/todo');
  22 | 	}
  23 | 
  24 | 	getWelcomeMessageElement(page: Page) {
  25 | 		return page.locator(this.welcomeMessage);
  26 | 	}
  27 | 
  28 | 	async deleteTodo(page: Page) {
> 29 | 		await page.click(this.deleteIcon);
     |              ^ Error: page.click: Test timeout of 30000ms exceeded.
  30 | 	}
  31 | 
  32 | 	async getNoTodosMessage(page: Page) {
  33 | 		return page.locator(this.noTodosMessage);
  34 | 	}
  35 | 
  36 | 	async getTodoItem(page: Page) {
  37 | 		return page.locator(this.todoItem);
  38 | 	}
  39 | }
```