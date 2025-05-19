# 🎭 PLAYWRIGHT TESTS - SWAG LABS

## Overview

- This example is designed to help learners get familiar with Playwright – a powerful tool for automating cross-browser user interface testing – through practical examples of how to write tests, interact with a website, and validate the correctness of functions.
- Author: Hoa Nguyen <[hoa.nguyen@asnet.com.vn](hoa.nguyen@asnet.com.vn)>

---

## Target

- Codebase Structure: 
    - Set up essential configurations for the testing environment.
- Test Case Development: 
    - Create test cases utilizing appropriate locators and user actions.
- Assertions:
    - Define clear and accurate expectations for each test scenario.
- Tools for Debug & Troubleshooting: 
    - Use Playwright tools like [Trace Viewer](https://playwright.dev/docs/debug#trace-viewer), [Inspector](https://playwright.dev/docs/debug#playwright-inspector), and logs for quick debugging.

---

## Features scope

- Verify user is able to login successful with standard user
- Verify user unable to login with locked out user
- Verify user is able to navigate to "Your cart" page
- Verify user is able to navigate to "All Items" page
- Verify user is able to add item to cart and checkout successful
- Verify user is able to sort product items by price (low to high)

---

## Setup environment

### 1. Make sure you install packages with correct version below:

- [node v20.10.0](https://nodejs.org/en/)
- [pnpm 7.32.3](https://pnpm.io/)

### 2. Redirect to folder

```bash
cd playwright-training
```

### 3. Install Dependencies

```bash
pnpm install
```

---

## Ways to use

### 1. Run all Tests

```bash
npx playwright test / pnpm exec playwright test
```

### 2. Run Tests by file

```bash
npx playwright test file-example.spec.ts
```

### 3. Run Tests with UI mode

```bash
npx playwright test --ui / pnpm exec playwright test --ui
```

### 4. Debug Tests

```bash
npx playwright test --debug / pnpm exec playwright test --debug
```

### 5. View HTML Report

```bash
npx playwright show-report
```
