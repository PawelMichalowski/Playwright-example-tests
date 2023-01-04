import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe('Feedback From', () => {
    let homePage: HomePage
    let feedbackPage: FeedbackPage

    test.beforeEach(async ({ page })=> {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

        await homePage.visis()
        await homePage.clickOnFeedbackLink()
    })

    //Reset feedback form
    test('Reset feedback form', async ({ page }) => {
        await feedbackPage.fillForm(
            'name', 
            'email@email.com', 
            'subject', 
            'my awesome message'
            )
            await feedbackPage.resetForm()
            await feedbackPage.assertReset()
    })

    //Submi feedback form
    test('Submit form', async ({ page }) => {
        await feedbackPage.fillForm(
            'name', 
            'email@email.com', 
            'subject', 
            'my awesome message'
            )
        await feedbackPage.submitForm()
        await feedbackPage.feedbackFormSent()
    })
})