import { Page, expect } from "@playwright/test";

export enum HOME {
    BTN_ADD_CART_BACKPACK = "#add-to-cart-sauce-labs-backpack",
    BTN_ADD_CART_BIKE = "#add-to-cart-sauce-labs-bike-light",
    BTN_REMOVE_CART_BACKPACK = "#remove-sauce-labs-backpack",
    BTN_REMOVE_CART_BIKE = "#remove-sauce-labs-bike-light",
    BTN_SHOPPING_TEXT = ".shopping_cart_badge",
    BTN_SHOPPING_CART = ".shopping_cart_link",
    TEXT_ITEM_NAME = ".inventory_item_name"
}

export const HOME_COMMANDS = {
    addTwoItemsInCheckout: async(page: Page) => {
        await page.locator(HOME.BTN_ADD_CART_BACKPACK).click();
        await page.locator(HOME.BTN_ADD_CART_BIKE).click();
        await expect(page.locator(HOME.BTN_SHOPPING_TEXT)).toHaveText("2");
    }
}