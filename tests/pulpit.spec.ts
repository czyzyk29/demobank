import { test, expect } from '@playwright/test';

test.describe('Test group pulpit ', () => {
  test.beforeEach(async ({ page }) => {
    const userId = 'testerte';
    const userPassword = 'polakama';

    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
  });
  test('quick payment', async ({ page }) => {
    //Arange
    const reciverId = '2';
    const transferTitle = 'pizza';
    const transferAmount = '150';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    //Act
    await page.locator('#widget_1_transfer_receiver').selectOption(reciverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile pop-up', async ({ page }) => {
    // Arrange
    const topUpReciverNumber = '500 xxx xxx';
    const topUpAmount = '100';
    const expetedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReciverNumber}`;

    //Act
    await page
      .locator('#widget_1_topup_receiver')
      .selectOption(topUpReciverNumber);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

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
    await page
      .locator('#widget_1_topup_receiver')
      .selectOption(topUpReciverNumber);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

    //Assert
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
