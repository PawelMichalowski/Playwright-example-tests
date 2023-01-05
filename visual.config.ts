import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    testDir: "tests/visual",
    expect: {
        timeout: 30 * 1000,
    },
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 15000,
        ignoreHTTPSErrors: true,
        video: "off",
        trace: "retain-on-failure",
        screenshot: "off"
    },
    projects: [
        {
        name: 'Chromium',
        use: { browserName: 'chromium'},
        },
        {
        name: 'Firefox',
        use: { browserName: 'firefox',}
        },
        {
        name: 'Webkit',
        use: { browserName: 'webkit'},
        },
    ],
}

export default config;