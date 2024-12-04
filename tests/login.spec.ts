import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('User Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('success login with correct credentials', async ({ page }) => {
    //Arange
    const userId = loginData.userId;
    const userPassword = loginData.userPass;
    const expectedUserName = 'Jan Demobankowy';

    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });
});
