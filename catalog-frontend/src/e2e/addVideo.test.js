import puppeteer from "puppeteer";
import { login } from "./utils/login";

test("Add new video", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    devtools: true,
    args: ["--start-maximized"],
    // slowMo: 10,
  });

  const page = await browser.newPage();
  await login(page);
  await page.waitFor(200);
  await page.waitForSelector("#add-movie-dialog", {
    visible: true,
    timeout: 2000,
  });
  await page.waitFor(400);
  await page.click("#add-movie-dialog");
  await page.waitForSelector("input[name=search-field-import]", {
    visible: true,
    timeout: 2000,
  });

  await page.focus("input[name=search-field-import]");
  await page.keyboard.type("fast", { delay: 0.1 });
  await page.click("#search-movie");

  await page.waitForSelector(".result-movie-card");

  // await page.waitFor(2000);
  await page.click(".result-movie-card");

  /*await page.waitForResponse((response) => {
    return response.request();
  });*/

  await page.click("#add-video");

  await page.on("response", (response) => {
    expect(response._status).toEqual(200);
  });
}, 900000);
