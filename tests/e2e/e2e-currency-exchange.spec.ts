import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Example currency exchange', () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        homePage.visis()
        homePage.clickOnSignIn()
        loginPage.login('username', 'password')
    })

    test('Currency exchange', async ({ page }) => {
        await page.click('#pay_bills_tab')
        await page.click('text=Purchase Foreign Currency')
        await page.selectOption('#pc_currency', 'EUR')

        const sellRate = await page.locator('#sp_sell_rate')
        await expect(sellRate).toContainText('1 euro (EUR)')

        await page.type('#pc_amount', '1000')
        await page.click('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')

        const ConversionAmount = await page.locator('#pc_conversion_amount')
        await expect(ConversionAmount).toContainText('721.40 euro (EUR) = 1000.00 U.S. dollar (USD)')

        await page.click('#purchase_cash')
        
        const messageAlert = await page.locator('#alert_content')
        await expect(messageAlert).toBeVisible()
        await expect(messageAlert).toContainText('Foreign currency cash was successfully purchased')
    })
})