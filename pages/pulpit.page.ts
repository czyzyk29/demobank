import { Locator, Page } from '@playwright/test';
import { SideBar } from '../components/sideBar.page';

export class PulpitPage {
  widgetTransferReciver: Locator;
  widget1TransferAmount: Locator;
  widget1TransferTitle: Locator;
  executeBtn: Locator;
  closeButton: Locator;
  showMessages: Locator;
  widget1TopupReceiver: Locator;
  widget1TopupAmount: Locator;
  uniformWidget1TopupAgreement: Locator;
  moneyValue: Locator;
  topupButton: Locator;
  topupReceiverInput: Locator;
  paymentButton: Locator;
  userName: Locator;
  sideBar: SideBar;
  constructor(private page: Page) {
    this.sideBar = new SideBar(this.page);

    this.userName = this.page.getByTestId('user-name');
    this.widgetTransferReciver = this.page.locator(
      '#widget_1_transfer_receiver',
    );
    this.widget1TransferAmount = this.page.locator('#widget_1_transfer_amount');
    this.widget1TransferTitle = this.page.locator('#widget_1_transfer_title');
    this.executeBtn = this.page.locator('#execute_btn');
    this.closeButton = this.page.getByTestId('close-button');
    this.showMessages = this.page.locator('#show_messages');
    this.widget1TopupReceiver = this.page.locator('#widget_1_topup_receiver');
    this.widget1TopupAmount = this.page.locator('#widget_1_topup_amount');
    this.uniformWidget1TopupAgreement = this.page.locator(
      '#uniform-widget_1_topup_agreement span',
    );
    this.moneyValue = this.page.locator('#money_value');
    this.topupButton = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });
    this.topupReceiverInput = this.page.locator('#widget_1_topup_receiver');
  }
}
