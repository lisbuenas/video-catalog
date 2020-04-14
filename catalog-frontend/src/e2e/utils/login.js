async function login(page) {
  await page.goto('http://localhost:3000/');
  await page.focus('input[name=email]');

  await page.keyboard.type('fe.lisboa@yahoo.com.br', { delay: 0.1 });
  await page.focus('input[name=password]');
  await page.keyboard.type('123456', { delay: 0.1 });
  await page.click('button[type=submit]');

  await page.waitFor(200);

  await expect(page.title()).resolves.toMatch('Video catalog');
}

module.exports = { login: login };
