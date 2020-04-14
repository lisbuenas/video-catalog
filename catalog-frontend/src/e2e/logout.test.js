import puppeteer from 'puppeteer';
import { login } from './utils/login';

describe('Logout user', () => {
  test('logout user', async (done) => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      devtools: true,
      args: ['--start-maximized'],
      // slowMo: 10,
    });

    const page = await browser.newPage();
    await login(page);

    await page.click('#logout');

    await page.waitFor(300);
    await expect(page.title()).resolves.toMatch('/');
    done();
  }, 900000);
});
