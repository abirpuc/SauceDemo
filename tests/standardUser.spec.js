
import {test, expect} from "@playwright/test"
import {faker} from "@faker-js/faker"
import LoginPage from "../pages/LoginPage";
import HamBurgerMenu from "../pages/HamBurgerMenu";
import Products from "../pages/ProductsContainer";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

test.describe("test case design for standard user",()=>{
    let logIn, hamBurgerMenu,productsContainer, cart, checkOut

    let userName = "standard_user"
    let password = "secret_sauce"

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const zipCode = faker.location.zipCode();


    test.beforeEach(async ({page})=>{
        logIn = new LoginPage(page)
        hamBurgerMenu = new HamBurgerMenu(page)
        productsContainer = new Products(page)
        cart = new CartPage(page)
        checkOut = new CheckoutPage(page)
        page.goto("/")
    })

    test("login test case design for standard use", async ({page})=>{
        // await page.pause()
        await logIn.enterInputData("Username", userName)
        await logIn.enterInputData("Password",password)
        await logIn.clickOnInputButton("Login")
        // await page.pause()
        await hamBurgerMenu.clickOnButton("Open Menu")
        await hamBurgerMenu.clickOnLink("Reset App State")
        await hamBurgerMenu.clickOnButton("Close Menu")

        // const products =  await productsContainer.productsContainerData(".inventory_item")
        const products = page.locator('.inventory_item')
        const productCount = await products.count()
        expect(productCount).toBeGreaterThanOrEqual(3);

        const indexes = Array.from(
        { length: productCount },
        (_, index) => index );

        indexes.sort(() => Math.random() - 0.5);

        const randomIndexes = indexes.slice(0, 3);

        // console.log('Random product indexes:', randomIndexes);

        for (const index of randomIndexes) {

        const product = products.nth(index);

        // const productName = await product.locator('.inventory_item_name').textContent();
        await product.locator('button').click();
        }

        await page.locator('.shopping_cart_link').click()  
        await cart.clickOnButton("Checkout")
        
        await checkOut.enterInputData("First Name", firstName)
        await checkOut.enterInputData("Last Name", lastName)
        await checkOut.enterInputData("Zip/Postal Code", zipCode)
        
        await checkOut.clickOnInputButton("Continue")
        
        

        await page.pause()
        await cart.clickOnButton("Finish")

        await hamBurgerMenu.clickOnButton("Open Menu")
        await hamBurgerMenu.clickOnLink("Reset App State")
        await hamBurgerMenu.clickOnLink("Logout")
    })

    // test("Test case design for hamburger menu", async ({page})=>{
    //     await page.pause()
    //     await hamBurgerMenu.clickHamburgerMenu("Open Menu")
    // })
})
