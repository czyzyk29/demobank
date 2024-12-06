import { Locator, Page } from '@playwright/test';

export class PaymentPage {
  transferReceiver: Locator;
  formAccountTo: Locator;
  formAmount: Locator;
  closeButton: Locator;
  messages: Locator;
  transferButton: Locator;
  constructor(private page: Page) {
    this.transferReceiver = this.page.getByTestId('transfer_receiver');
    this.formAccountTo = this.page.getByTestId('form_account_to');
    this.formAmount = this.page.getByTestId('form_amount');
    this.closeButton = this.page.getByTestId('close-button');
    this.messages = this.page.locator('#show_messages');
    this.transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' })
  }
}
