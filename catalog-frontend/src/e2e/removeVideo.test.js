import puppeteer from "puppeteer";
import { login } from "./utils/login";

test("Remove video", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    devtools: true,
    args: ["--start-maximized"],
    // slowMo: 10,
  });

  const page = await browser.newPage();
  await login(page);

  //expect(text).toBe("Video removed.");

  await page.waitForSelector(".edit-video");
  await page.click(".edit-video");

  await page.waitForSelector("#remove-button");
  await page.click("#remove-button");

  await page.waitForSelector("#confirm-remove");
  await page.click("#confirm-remove");

  await page.on("response", (response) => {
    expect(response._status).toEqual(200);
  });
}, 900000);
