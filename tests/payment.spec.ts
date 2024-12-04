import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('User Payments', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    //Arange
    const userId = loginData.userId;
    const userPassword = loginData.userPass;

    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('simple payment', async ({ page }) => {
    //Arange
    const transferReceiver = 'jan nowak';
    const amount = '222';
    const accountTo = '12 3321 2312 3123 4324 3243 2432';
    const expectedMessage = `Przelew wykonany! ${amount},00PLN dla ${transferReceiver}`;

    //Act
    await page.getByTestId('transfer_receiver').fill(transferReceiver);
    await page.getByTestId('form_account_to').fill(accountTo);
    await page.getByTestId('form_amount').fill(amount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();
    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
