// @ts-check
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';


test.describe("Test case design for locked user",  ()=>{
  
  // export the class name;
  let logIn;

  //input data
    let userName = "locked_out_user"
    let password = "secret_sauce"

  // before hook

  test.beforeEach(async ({page})=>{
    logIn = new LoginPage(page)
    page.goto("/")
  })

  test("Validate the locked user with error message", async ({page})=>{
    // await page.pause()
    await logIn.enterInputData("Username",userName);
    await logIn.enterInputData("Password",password);
    await logIn.clickOnInputButton("Login");

    await expect(page.locator("h3")).toContainText("Sorry, this user has been locked out")
  })
})
