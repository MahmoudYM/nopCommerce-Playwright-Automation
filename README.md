# nopCommerce Playwright Test Automation

[![Playwright Tests](https://img.shields.io/badge/tests-Playwright-45ba4b)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)](https://www.typescriptlang.org/)
[![Page Object Model](https://img.shields.io/badge/pattern-POM-orange)](https://playwright.dev/docs/pom)

Professional end-to-end test automation framework for [nopCommerce Demo](https://demo.nopcommerce.com/) built with Playwright and TypeScript using Page Object Model design pattern.

## 🎯 Project Overview

This project demonstrates professional test automation skills using modern tools and best practices:

- **Framework**: Playwright with TypeScript
- **Design Pattern**: Page Object Model (POM)
- **Test Coverage**: User Registration, Login, Product Search, Shopping Cart
- **Reporting**: HTML Reports with screenshots and videos
- **CI Ready**: Configured for parallel execution

## 🏗️ Project Structure

```
nopcommerce-playwright-tests/
├── pages/                    # Page Object Model classes
│   ├── BasePage.ts          # Base class with common methods
│   ├── HomePage.ts          # Home page objects and methods
│   ├── RegisterPage.ts      # Registration page
│   ├── LoginPage.ts         # Login page
│   ├── SearchPage.ts        # Search results page
│   ├── ProductPage.ts       # Product details page
│   └── CartPage.ts          # Shopping cart page
├── tests/                   # Test specifications
│   ├── registration.spec.ts # User registration tests
│   ├── login.spec.ts        # Login functionality tests
│   ├── search.spec.ts       # Product search tests
│   └── cart.spec.ts         # Shopping cart tests
├── utils/                   # Utility functions
│   └── TestDataHelper.ts    # Test data generation helpers
├── playwright.config.ts     # Playwright configuration
├── package.json            # Project dependencies
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd nopcommerce-playwright-tests
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
npx playwright install
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run specific browser
```bash
npm run test:chrome
npm run test:firefox
```

### Run specific test file
```bash
npx playwright test tests/login.spec.ts
```

### Run tests with tag
```bash
npx playwright test --grep @smoke
```

## 📊 View Reports

After running tests, view the HTML report:
```bash
npm run report
```

## 📝 Test Scenarios Covered

### 1. User Registration
- ✅ Successful user registration
- ✅ Validation for existing email
- ✅ Required field validation

### 2. User Login
- ✅ Login with valid credentials
- ✅ Error handling for invalid credentials
- ✅ Empty credentials validation

### 3. Product Search
- ✅ Search with valid product name
- ✅ Handle no results scenario
- ✅ Search across different categories
- ✅ Navigate to product from search results

### 4. Shopping Cart
- ✅ Add product to cart
- ✅ Add multiple quantities
- ✅ Update product quantity in cart
- ✅ Remove product from cart
- ✅ Empty cart validation

## 🎨 Page Object Model Implementation

The project follows the Page Object Model design pattern:

### Base Page
```typescript
export class BasePage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }
  
  // Common methods used across all pages
}
```

### Page Classes
Each page extends `BasePage` and contains:
- Locators as private properties
- Page-specific methods
- Reusable actions

### Example Usage
```typescript
const homePage = new HomePage(page);
await homePage.goto();
await homePage.searchProduct('laptop');
```

## 🔧 Configuration

### Playwright Config Highlights
- Multi-browser support (Chrome, Firefox, Safari)
- Parallel test execution
- Automatic screenshots on failure
- Video recording on failure
- Retry mechanism for flaky tests
- HTML report generation

## 🎯 Best Practices Implemented

1. **Page Object Model**: Clean separation of page logic and tests
2. **DRY Principle**: Reusable methods in BasePage
3. **Type Safety**: Full TypeScript implementation
4. **Explicit Waits**: Proper wait strategies for stable tests
5. **Test Independence**: Each test can run independently
6. **Descriptive Naming**: Clear test and method names
7. **Error Handling**: Graceful handling of edge cases

## 📈 Future Enhancements

- [ ] Add API testing
- [ ] Implement visual regression testing
- [ ] Add GitHub Actions CI/CD pipeline
- [ ] Integrate with test management tool
- [ ] Add performance testing
- [ ] Implement data-driven testing
- [ ] Add accessibility testing

## 🛠️ Technologies Used

- **Playwright**: Modern web testing framework
- **TypeScript**: Type-safe JavaScript
- **Node.js**: Runtime environment
- **Page Object Model**: Design pattern for maintainability

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 👤 Author

**Your Name**
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]
- Email: your.email@example.com

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if this project helped you learn test automation!

---

**Note**: This project is created for educational and portfolio purposes using the publicly available nopCommerce demo site.
