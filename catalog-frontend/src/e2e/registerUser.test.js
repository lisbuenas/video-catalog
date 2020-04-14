import puppeteer from 'puppeteer';

import faker from 'faker';

describe('Register Form', () => {
  test('register user', async (done) => {
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      slowMo: 40,
    });
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/');
    await page.click('#register');

    await page.waitForSelector('#create-account-modal');
    await page.focus('input[name=email-register]');

    await page.keyboard.type(faker.internet.email(), { delay: 0.1 });
    await page.focus('input[name=password-register]');
    await page.keyboard.type('123456', { delay: 0.1 });
    await page.click('button[type=submit]');

    await expect(page.title()).resolves.toMatch('Video catalog');
    done();
    await browser.close();
  }, 30000);
});
