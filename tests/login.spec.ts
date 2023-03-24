import { test, expect } from "@playwright/test";
import { LOGIN } from "../pageObjects/login";

test.describe("Login Tests", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("https://www.saucedemo.com/")
        await expect(page.locator(LOGIN.BTN_LOGIN)).toBeVisible();
    })
    test("Should validate login successfully", async ({page}) => {            
        await page.locator(LOGIN.INPUT_USERNAME).fill(`${process.env.STANDARD_USER}`);
        await page.locator(LOGIN.INPUT_PASSWORD).fill(`${process.env.PASSWORD}`);
        await page.locator(LOGIN.BTN_LOGIN).click();
        await expect(page.getByText("Products")).toBeVisible()
    })

    test("Try login with invalid username", async({page}) => {
        await page.locator(LOGIN.INPUT_USERNAME).fill(`invalid`);
        await page.locator(LOGIN.INPUT_PASSWORD).fill(`${process.env.PASSWORD}`);
        await page.locator(LOGIN.BTN_LOGIN).click();
        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible()
    })

    test("Try login with invalid password", async({page}) => {
        await page.locator(LOGIN.INPUT_USERNAME).fill(`${process.env.STANDARD_USER}`);
        await page.locator(LOGIN.INPUT_PASSWORD).fill(`invalid`);
        await page.locator(LOGIN.BTN_LOGIN).click();
        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible()
    })

    test("Try login with empty username and password", async({page}) => {
        await page.locator(LOGIN.BTN_LOGIN).click();
        await expect(page.getByText("Epic sadface: Username is required")).toBeVisible()
    })

})
