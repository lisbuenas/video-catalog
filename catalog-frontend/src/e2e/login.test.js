import puppeteer from 'puppeteer';

async function login(page) {
  await page.goto('http://localhost:3000/');
  await page.focus('input[name=email]');

  await page.keyboard.type('fe.lisboa@yahoo.com.br', { delay: 0.1 });
  await page.keyboard.type('123456', { delay: 0.1 });
  await page.click('button[type=submit]');

  await expect(page.title()).resolves.toMatch('Video catalog');
  return;
}

export default login;

describe('Login Form', () => {
  test('Login user', async (done) => {
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      slowMo: 40,
    });
    const page = await browser.newPage();

    login(page);

    done();
    await browser.close();
  }, 30000);
});
