import { Locator, Page } from '@playwright/test';
import { SideBar } from '../components/sideBar.page';

export class PaymentPage {
  transferReceiver: Locator;
  formAccountTo: Locator;
  formAmount: Locator;
  closeButton: Locator;
  messages: Locator;
  transferButton: Locator;
  sideBar: SideBar;
  constructor(private page: Page) {
    this.sideBar = new SideBar(this.page);

    this.transferReceiver = this.page.getByTestId('transfer_receiver');
    this.formAccountTo = this.page.getByTestId('form_account_to');
    this.formAmount = this.page.getByTestId('form_amount');
    this.closeButton = this.page.getByTestId('close-button');
    this.messages = this.page.locator('#show_messages');
    this.transferButton = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
  }

  async maketransfer(
    transferReceiver: string,
    accountTo: string,
    amount: string,
  ): Promise<void> {
    await this.transferReceiver.fill(transferReceiver);
    await this.formAccountTo.fill(accountTo);
    await this.formAmount.fill(amount);
    await this.transferButton.click();
    await this.closeButton.click();
  }
}
