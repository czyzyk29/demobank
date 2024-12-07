import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Test group pulpit ', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPass;

    pulpitPage = new PulpitPage(page);

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);
  });
  test('quick payment', async ({ page }) => {
    //Arange
    const reciverId = '2';
    const transferTitle = 'pizza';
    const transferAmount = '150';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    //Act
    await pulpitPage.executeQuickPayment(
      reciverId,
      transferAmount,
      transferTitle
    );

    //Assert
    await expect(pulpitPage.showMessages).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile pop-up', async ({ page }) => {
    // Arrange
    const topUpReciverNumber = '500 xxx xxx';
    const topUpAmount = '100';
    const expetedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReciverNumber}`;

    //Act
    await pulpitPage.executeMobileTopUp(topUpReciverNumber, topUpAmount);

    //Assert
    await expect(
      page.getByRole('link', { name: 'Doładowanie wykonane! 100,' }),
    ).toHaveText(expetedMessage);
  });

  test('correct balance successful mobile pop-up', async ({ page }) => {
    // Arrange
    const topUpReciverNumber = '500 xxx xxx';
    const topUpAmount = '100';

    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    //Act
    await pulpitPage.executeMobileTopUp(topUpReciverNumber, topUpAmount);

    //Assert
    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
