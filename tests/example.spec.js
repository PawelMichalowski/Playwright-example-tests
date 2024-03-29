import { test, expect } from '@playwright/test'

import { leadHomepage, assertTitle } from '../helpers'

test("Simple basic test", async ({ page }) => {
    await page.goto('http://example.com/')
    const pageTitle = await page.locator('h1')
    await expect (pageTitle).toContainText('Example Domain')
})


test("Clickin on Elements", async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click("#signin_button")
    await page.click("text=Sign in")

    const errorMessage = await page.locator(".alert-error")
    await expect (errorMessage).toContainText('Login and/or password are wrong.')
})

test.skip('Selectors', async ({ page }) => {
    // text
    await page.click("text=some text")

    // Css Selectors
    await page.click("button")
    await page.click("#id")
    await page.click(".class")

    // Only visible Css Selector
    await page.click(".submit-button:visible")

    // Combinations
    await page.click("#username, .first")

    // XPath
    await page.click("//button")

})

test.describe ('My first test suite', () => {
    test('Workin with Inputs @myTag', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click("#signin_button")
        await page.type('#user_login', 'some username')
        await page.type('#user_password', 'some password')
        await page.click("text=Sign in")
    
        const errorMessage = await page.locator(".alert-error")
        await expect (errorMessage).toContainText('Login and/or password are wrong.')
    })
    
    test('Assertion', async ({ page }) => {
        await page.goto('https://example.com/')
        await expect(page).toHaveURL('https://example.com/')
        await expect(page).toHaveTitle('Example Domain')
    
        const element = await page.locator('h1')
        await expect (element).toBeVisible()
        await expect (element).toHaveText("Example Domain")
        await expect (element).toHaveCount(1)
    
        const nonExistingElement = await page.locator('h5')
        await expect (nonExistingElement).not.toBeVisible()
    })
})

test.describe('Hooks', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://the-internet.herokuapp.com/')
    })

    test('Screenshots', async ({ page }) => {
        // 1. step is oad website
        // await page.goto('http://the-internet.herokuapp.com/')
        // 2. take screenshot of full page
        await page.screenshot({ path: "screenshot.png", fullPage: true})
    })
    
    test('Single element Screenshot', async ({ page }) => {
        // await page.goto('http://the-internet.herokuapp.com/')
        const element = await page.$('h1')
        await element.screenshot({ path: "single_element_screenshot.png" })
    })
})
 
test.only('Custom Helpesr', async ({ page }) => {
    await leadHomepage(page)
    // await page.pause()
    await assertTitle(page)
})