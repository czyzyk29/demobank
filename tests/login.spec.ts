import { test, expect } from '@playwright/test';

test.describe('User Login', () => {
  test('success login with correct credentials', async ({ page }) => {
    //Arange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'testerte';
    const userPassword = 'polakama';
    const expectedUserName = 'Jan Demobankowy';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsucess login with incorrect username', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const incorrectUserId = 'tester';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('password-input').click();

    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorMessage,
    );
  });

  test('unsucess login with to short password', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'tester12';
    const userPassword = 'pola';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('password-input').blur();

    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage,
    );
  });
});
