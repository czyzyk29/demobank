import { test, expect } from '@playwright/test';

test.describe('Test group pulpit ', () => {
  test.only('quick payment', async ({ page }) => {
    //Arange

    const url = 'https://demo-bank.vercel.app/';
    const userId = 'testerte';
    const userPassword = 'polakama';

    const reciverId = '2';
    const transferTitle = 'pizza';
    const transferAmount = '150';
    const expectedTransferReceiver = 'bug Chuck Demobankowy';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption(reciverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile pop-up', async ({ page }) => {

    const url = 'https://demo-bank.vercel.app/';
    const userId = 'testerte';
    const userPassword = 'polakama';
    
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('100');
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();

    await expect(
      page.getByRole('link', { name: 'Doładowanie wykonane! 100,' }),
    ).toHaveText('Doładowanie wykonane! 100,00PLN na numer 500 xxx xxx');
  });
});
