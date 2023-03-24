import { test, expect } from "@playwright/test";
import { LOGIN_COMMANDS } from "../pageObjects/login";
import { HOME, HOME_COMMANDS } from "../pageObjects/home";
import { CHECKOUT } from "../pageObjects/checkout";

test.describe("Cart Tests", () => {

    test.beforeEach(async ({page}) => {
        await LOGIN_COMMANDS.login(page);
    })

    test("Should validate add cart to shopping", async({page}) => {
        await page.locator(HOME.BTN_ADD_CART_BACKPACK).click();
        await page.locator(HOME.BTN_ADD_CART_BIKE).click();
        await expect(page.locator(HOME.BTN_SHOPPING_TEXT)).toHaveText("2");
    })

    test("Should validate remove cart to shopping", async({page}) => {
        await HOME_COMMANDS.addTwoItemsInCheckout(page);
        await page.locator(HOME.BTN_REMOVE_CART_BACKPACK).click();
        await page.locator(HOME.BTN_REMOVE_CART_BIKE).click();
        await expect(page.locator(HOME.BTN_SHOPPING_TEXT)).not.toBeVisible();
    })

    test("Should validate the total number of items in chcekout", async({page}) => {
        await HOME_COMMANDS.addTwoItemsInCheckout(page);
        await page.locator(HOME.BTN_SHOPPING_CART).click();
        let products = await page.locator(CHECKOUT.TEXT_ITEM_NAME).all();
        await expect(products.length).toEqual(2);
        await expect(products[0]).toHaveText("Sauce Labs Backpack");
        await expect(products[1]).toHaveText("Sauce Labs Bike Light");
    })
})