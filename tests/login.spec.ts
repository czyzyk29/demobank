import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('success login with correct credentials', async ({ page }) => {
    //Arange
    const userId = loginData.userId;
    const userPassword = loginData.userPass;
    const expectedUserName = 'Jan Demobankowy';

    const loginPage = new LoginPage(page);

    //Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short userid', async ({ page }) => {
    // Arrange
    const incorrectUserId = 'tester';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';
    
    // Act
    const loginPage = new LoginPage(page);
    loginPage.loginInput.fill(incorrectUserId);
    loginPage.passwordInput.click()

    // Assert
    await expect(loginPage.loginError).toHaveText(
      expectedErrorMessage,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const incorrectPassword = '1234';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(loginData.userId);
    await loginPage.passwordInput.fill(incorrectPassword);
    await loginPage.passwordInput.blur();
    
    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectPassword);
    await page.getByTestId('password-input').blur();

    // Assert
    await expect(loginPage.passwordError).toHaveText(
      expectedErrorMessage,
    );
  });
});
