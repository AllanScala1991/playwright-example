import { Page, expect } from "@playwright/test";

export enum LOGIN {
    INPUT_USERNAME = "#user-name",
    INPUT_PASSWORD = "#password",
    BTN_LOGIN= "#login-button",
    ERROR_MESSAGE= ".error-button"
}



export const LOGIN_COMMANDS= {
    login : async(page: Page) => {
        await page.goto("https://www.saucedemo.com/")
        await expect(page.locator(LOGIN.BTN_LOGIN)).toBeVisible();
        await page.locator(LOGIN.INPUT_USERNAME).fill(`${process.env.STANDARD_USER}`);
        await page.locator(LOGIN.INPUT_PASSWORD).fill(`${process.env.PASSWORD}`);
        await page.locator(LOGIN.BTN_LOGIN).click();
        await expect(page.getByText("Products")).toBeVisible()
    }  
}





