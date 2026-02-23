import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  // Locators
  private readonly genderMale = '#gender-male';
  private readonly genderFemale = '#gender-female';
  private readonly firstNameInput = '#FirstName';
  private readonly lastNameInput = '#LastName';
  private readonly dobDay = 'select[name="DateOfBirthDay"]';
  private readonly dobMonth = 'select[name="DateOfBirthMonth"]';
  private readonly dobYear = 'select[name="DateOfBirthYear"]';
  private readonly emailInput = '#Email';
  private readonly companyInput = '#Company';
  private readonly passwordInput = '#Password';
  private readonly confirmPasswordInput = '#ConfirmPassword';
  private readonly registerButton = '#register-button';
  private readonly successMessage = 'div.result';
  private readonly continueButton = 'a.register-continue-button';

  constructor(page: Page) {
    super(page);
  }

  async selectGender(gender: 'male' | 'female') {
    if (gender === 'male') {
      await this.clickElement(this.genderMale);
    } else {
      await this.clickElement(this.genderFemale);
    }
  }

  async fillFirstName(firstName: string) {
    await this.fillInput(this.firstNameInput, firstName);
  }

  async fillLastName(lastName: string) {
    await this.fillInput(this.lastNameInput, lastName);
  }

  async selectDateOfBirth(day: string, month: string, year: string) {
    await this.page.selectOption(this.dobDay, day);
    await this.page.selectOption(this.dobMonth, month);
    await this.page.selectOption(this.dobYear, year);
  }

  async fillEmail(email: string) {
    await this.fillInput(this.emailInput, email);
  }

  async fillCompany(company: string) {
    await this.fillInput(this.companyInput, company);
  }

  async fillPassword(password: string) {
    await this.fillInput(this.passwordInput, password);
  }

  async fillConfirmPassword(password: string) {
    await this.fillInput(this.confirmPasswordInput, password);
  }

  async clickRegister() {
    await this.clickElement(this.registerButton);
  }

  async getSuccessMessage(): Promise<string> {
    return await this.getElementText(this.successMessage);
  }

  async clickContinue() {
    await this.clickElement(this.continueButton);
  }

  async registerUser(userData: {
    gender: 'male' | 'female';
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    company?: string;
  }) {
    await this.selectGender(userData.gender);
    await this.fillFirstName(userData.firstName);
    await this.fillLastName(userData.lastName);
    await this.fillEmail(userData.email);
    if (userData.company) {
      await this.fillCompany(userData.company);
    }
    await this.fillPassword(userData.password);
    await this.fillConfirmPassword(userData.password);
    await this.clickRegister();
  }
}
