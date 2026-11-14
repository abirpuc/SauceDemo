import { expect, test } from "@playwright/test"
import { faker } from "@faker-js/faker"
import LoginPage from "../pages/LoginPage";
import HamBurgerMenu from "../pages/HamBurgerMenu";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import LocatorFunction from "../pages/Locator";

test.describe("Test case design for performance Glitch user", () => {

    let logIn, hamBurgerMenu, cart, checkOut, locatorFun;


    let userName = "performance_glitch_user"
    let passWord = "secret_sauce"

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const zipCode = faker.location.zipCode();

    test.beforeEach(async ({ page }) => {
        logIn = new LoginPage(page)
        hamBurgerMenu = new HamBurgerMenu(page)
        cart = new CartPage(page)
        checkOut = new CheckoutPage(page)
        locatorFun = new LocatorFunction(page)
        page.goto("/")
    })

    test("Login test case design for glitch user", async ({ page }) => {
        await logIn.enterInputData("Username", userName)
        await logIn.enterInputData("Password", passWord)
        await logIn.clickOnInputButton("Login")


        await hamBurgerMenu.clickOnButton("Open Menu")
        await hamBurgerMenu.clickOnMenu("Reset App State")
        await hamBurgerMenu.clickOnButton("Close Menu")
        
        
       
        await locatorFun.clickOnProductShortMenu()
      


        const products = page.locator(".inventory_item")

        const firstProduct = products.first()
        await firstProduct.locator("button").click()

        await page.locator('.shopping_cart_link').click()
        await cart.clickOnButton("Checkout")

        await checkOut.enterInputData("First Name", firstName)
        await checkOut.enterInputData("Last Name", lastName)
        await checkOut.enterInputData("Zip/Postal Code", zipCode)

        await checkOut.clickOnInputButton("Continue")

        const productNames = page.locator(".inventory_item_name")
        const count = await productNames.count()

        expect(count).toBeGreaterThan(0)

        for (let i = 0; i < count; i++) {
            const productName = await productNames.nth(i).textContent();

            expect(productName).not.toBeNull();
            expect(productName.trim()).not.toBe('')
        }

        const totalPrice = page.locator('.summary_total_label')
        await expect(totalPrice).toBeVisible()
        const totalText = await totalPrice.textContent()
        expect(totalText).toMatch(/Total: \$\d+\.\d{2}/);


        await page.locator('[data-test="finish"]').click();
        await expect(page).toHaveURL(/checkout-complete\.html/);
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');

        await cart.clickOnButton("Back Home")
        await hamBurgerMenu.clickOnButton("Open Menu")
        await hamBurgerMenu.clickOnMenu("Reset App State")
        await hamBurgerMenu.clickOnMenu("Logout")

    })

})