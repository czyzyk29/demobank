import { test, expect } from "@playwright/test";

test.describe("Test group pulpit ", () => {
  test("quit payment", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testerte");
    await page.getByTestId("password-input").fill("password");
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_transfer_receiver").selectOption("2");
    await page.locator("#widget_1_transfer_amount").fill("150");
    await page.locator("#widget_1_transfer_title").fill("pizza");

    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();

    await expect(page.locator("#show_messages")).toHaveText(
      "Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza"
    );
  });

  test.only("successful mobile pop-up", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testerte");
    await page.getByTestId("password-input").fill("password");
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_topup_receiver").selectOption("500 xxx xxx");
    await page.locator("#widget_1_topup_amount").fill("100");
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();

    await expect(
      page.getByRole("link", { name: "Doładowanie wykonane! 100," })
    ).toHaveText("Doładowanie wykonane! 100,00PLN na numer 500 xxx xxx");
  });
});
