import { Locator, Page } from "@playwright/test";

export class SideBar {

    paymentButton: Locator
    constructor(private page:Page) {
        
        this.paymentButton = this.page.getByRole('link', { name: 'płatności' })
    }
}