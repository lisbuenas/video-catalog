import puppeteer from 'puppeteer';
import { login } from './utils/login';

test('Add new video', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    devtools: true,
    args: ['--start-maximized'],
    // slowMo: 10,
  });

  const page = await browser.newPage();
  await login(page);
}, 900000);
