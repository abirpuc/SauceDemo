
export default class BasePage{
    constructor(page){
        this.page = page
    }

    // functions 

    inputField(text, value){
        return this.page.getByPlaceholder(text)
    }

    inputButton(text){
        return this.page.locator(`//input[@value='${text}']`)
    }

    buttonClick(text){
        return this.page.getByRole("button", {name: text})
    }

    linkData(text){
        return this.page.getByRole("link", {name: text})
    }

    clickLocator(text){
        return this.page.locator(text)
    }

    // methods for login

    async enterInputData(fieldName, value){
        await this.inputField(fieldName).fill(value)
    }

    async clickOnInputButton(text){
        await this.inputButton(text).click()
    }

    // hamburger menu methods

    async clickOnButton(text){
        await this.buttonClick(text).click()
    }

    async clickOnLink(text){
        await this.linkData(text).click()
    }
}