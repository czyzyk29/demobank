import { test, expect } from "@playwright/test";

test.describe("User Login", () => {

  test("success login with correct credentials", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testerte");
    await page.getByTestId("password-input").fill("polakama");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
  });

  test("unsucess login with incorrect username", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("tester");
    await page.getByTestId("password-input").click();

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków"
    );
  });

  test("unsucess login with to short password", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testerte");
    await page.getByTestId("password-input").fill("213123");

    await page.getByTestId("password-input").blur()
    await expect(page.getByTestId("error-login-password")).toHaveText(
      "hasło ma min. 8 znaków"
    );
  });
});
