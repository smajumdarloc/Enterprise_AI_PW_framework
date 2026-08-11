# Enterprise AI Test Automation Framework

A scalable end-to-end automation framework built using **Playwright + TypeScript/JavaScript**, designed with enterprise-level best practices including Page Object Model (POM), reusable utilities, fixtures, API testing support, and Allure reporting.

---

## 🚀 Features

- Playwright E2E automation
- Page Object Model (POM)
- Reusable fixtures
- API testing support
- Allure reporting
- Screenshots, videos, and traces on failure
- CI/CD ready structure
- AI-ready architecture for future enhancements

---

## 🛠 Tech Stack

- Playwright
- Node.js
- JavaScript / TypeScript
- Allure Reports
- Git & GitHub

---

## 📁 Project Structure

```text
Enterprise_AI_PW_framework/
├── tests/                 # Test cases
├── pages/                 # Page objects
├── utils/                 # Utility functions
├── fixtures/              # Custom fixtures
├── data/                  # Test data
├── reports/               # HTML reports
├── allure-results/        # Raw Allure results
├── playwright.config.js
├── package.json
└── README.md
```

---

## ⚙️ Setup

### Clone the repository

```bash
git clone https://github.com/smajumdarloc/Enterprise_AI_PW_framework.git
cd Enterprise_AI_PW_framework
```

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install
```

---

## ▶️ Run Tests

### Run all tests

```bash
npx playwright test
```

### Run in headed mode

```bash
npx playwright test --headed
```

### Run a specific test

```bash
npx playwright test tests/login.spec.js
```

---

## 📊 HTML Report

Generate and open the Playwright HTML report:

```bash
npx playwright show-report
```

---

## 📈 Allure Report

Generate Allure report:

```bash
npx allure-commandline generate allure-results -o allure-report --clean
```

Open Allure report:

```bash
npx allure-commandline open allure-report
```

---

## 🧪 Sample Test

```javascript
import { test, expect } from '@playwright/test';

test('home page should load', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

---

## 🔮 Future Enhancements

- AI-powered test data generation
- Self-healing locators
- Visual testing
- Parallel execution in CI
- Docker support
- Jenkins/GitHub Actions integration

---

## 👩‍💻 Author

**Shipra Majumdar**

- GitHub: https://github.com/smajumdarloc