
export default class BasePage{
    constructor(page){
        this.page = page
        // this.clickMenu = this.page.locator(`//a[contains(text(),'Reset App State')]`)
        this.productShort = this.page.locator(`//div[@class='right_component']`)
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

    clickMenu(menuName){
        return this.page.locator(`//a[contains(text(),'${menuName}')]`)
    }

    selectOption(optionLabel){
        return this.page.locator(`//option[contains(text(),'${optionLabel}')]`)
    }

    // methods for login

    async enterInputData(fieldName, value){
        await this.inputField(fieldName).fill(value)
    }

    async clickOnInputButton(text){
        await this.inputButton(text).click()
    }

    // hamburger menu methods

    async clickToSelectOption(label){
        await this.selectOption(label).click()
    }

    async clickOnButton(text){
        await this.buttonClick(text).click()
    }

    async clickOnLink(text){
        await this.linkData(text).click()
    }

    async clickOnMenu(menuLabel){
        await this.clickMenu(menuLabel).click()
    }

    async clickOnProductShortMenu(){
        await this.productShort.click()
    }
}