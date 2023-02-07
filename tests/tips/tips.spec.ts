import { test, expect } from '@playwright/test'
import { getRandomNumber, getRandomString } from '../../utils/data-helpers'

test.describe('Tips & Tricks Section', () => {
    test('TestInfo Object', async ({ page }, testInfo) => {
        await page.goto('https://www.example.com')
        // console.log(testInfo.expectedStatus)
        let newNumber = await getRandomNumber()
        let newString = await getRandomString()
        console.log(newNumber)
        console.log(newString)
    })

    test ('Test Skip Browser', async ({ page, browserName}) => {
        await page.goto('https://www.example.com')
        test.skip(browserName === 'chromium', 'Feature no ready in Chrome browser')
    })

    test('Test Fixme Annotation', async ({ page, browserName}) => {
        test.fixme(browserName === 'chromium', 'Test is not stable, needs revision')
        await page.goto('https://www.example.com')
    })

    const people = ['Kula', 'Psarka', 'Karmel', 'Miki', 'Marta']
    for (const name of people) {
        test(`Running test for ${name}`, async ({ page }) => {
            await page.goto('http://zero.webappsecurity.com/index.html')
            await page.type('#searchTerm', `${name}`)
            await page.waitForTimeout(3000)
        })
    }

    test('Mouse Movement Simulation', async ({ page }) => {
        await page.goto('https://www.example.com')
        await page.mouse.move(0,0)
        await page.mouse.down()
        await page.mouse.move(0,100)
        await page.mouse.up()
    })

    test('Multiple browser tabs inside 1 Browser', async ({ browser }) => {
        const context = await browser.newContext()
        const page1 = await browser.newPage()
        const page2 = await browser.newPage()
        const page3 = await browser.newPage()
        await page1.goto('https://www.example.com')
        await page2.goto('https://www.example.com')
        await page3.goto('https://www.example.com')
        await page1.waitForTimeout(5000)
    })
})