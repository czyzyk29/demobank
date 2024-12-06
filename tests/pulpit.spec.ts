import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Test group pulpit ', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPass;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });
  test('quick payment', async ({ page }) => {
    //Arange
    const reciverId = '2';
    const transferTitle = 'pizza';
    const transferAmount = '150';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    const pulpitPage = new PulpitPage(page);
    
    //Act
    await pulpitPage.widgetTransferReciver.selectOption(reciverId);
    await pulpitPage.widget1TransferAmount.fill(transferAmount);
    await pulpitPage.widget1TransferTitle.fill(transferTitle);

    await pulpitPage.executeBtn.click();
    await pulpitPage.closeButton.click();

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
    const pulpitPage = new PulpitPage(page);
    //Act
    await pulpitPage.widget1TopupReceiver
      .selectOption(topUpReciverNumber);
    await pulpitPage.widget1TopupAmount.fill(topUpAmount);
    await pulpitPage.uniformWidget1TopupAgreement.click();
    await pulpitPage.topupButton.click();

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
    const pulpitPage = new PulpitPage(page);
    //Act
    await pulpitPage.topupReceiverInput
      .selectOption(topUpReciverNumber);
    await pulpitPage.widget1TopupAmount.fill(topUpAmount);
    await pulpitPage.uniformWidget1TopupAgreement.click();
    await pulpitPage.topupButton.click();

    //Assert
    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
