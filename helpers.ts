export async function leadHomepage(page) {
    await page.goto('http://the-internet.herokuapp.com/')
}

export async function assertTitle(page) {
    await page.waitForSelector('h5')
}
