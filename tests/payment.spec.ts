import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('User Payments', () => {
  let loginPage: LoginPage;
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    //Arange
    const userId = loginData.userId;
    const userPassword = loginData.userPass;
    paymentPage = new PaymentPage(page);
    loginPage = new LoginPage(page);
    //Act
    await page.goto('/');

    await loginPage.login(userId, userPassword);

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideBar.paymentButton.click();
  });

  test('simple payment', async ({ page }) => {
    //Arange
    const transferReceiver = 'jan nowak';
    const amount = '222';
    const accountTo = '12 3321 2312 3123 4324 3243 2432';
    const expectedMessage = `Przelew wykonany! ${amount},00PLN dla ${transferReceiver}`;

    //Act
    await paymentPage.maketransfer(transferReceiver, accountTo, amount);

    //Assert
    await expect(paymentPage.messages).toHaveText(expectedMessage);
  });
});
