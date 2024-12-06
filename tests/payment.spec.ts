import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';

test.describe('User Payments', () => {
  test.beforeEach(async ({ page }) => {
    //Arange
    const userId = loginData.userId;
    const userPassword = loginData.userPass;

    //Act
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('simple payment', async ({ page }) => {
    //Arange
    const transferReceiver = 'jan nowak';
    const amount = '222';
    const accountTo = '12 3321 2312 3123 4324 3243 2432';
    const expectedMessage = `Przelew wykonany! ${amount},00PLN dla ${transferReceiver}`;

    const paymentPage = new PaymentPage(page);

    //Act
    await paymentPage.transferReceiver.fill(transferReceiver);
    await paymentPage.formAccountTo.fill(accountTo);
    await paymentPage.formAmount.fill(amount);
    await paymentPage.transferButton.click();
    await paymentPage.closeButton.click();
    //Assert
    await expect(paymentPage.messages).toHaveText(expectedMessage);
  });
});
