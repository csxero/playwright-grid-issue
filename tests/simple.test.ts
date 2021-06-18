import { Page } from "playwright";
import { driverSetup, tearDown } from "../helpers/driver";

describe("Smoke", () => {
  let page: Page;

  beforeAll(async () => {
    page = await driverSetup();
  });

  afterAll(async () => {
    await tearDown();
  });

  it("What is my user agent", async () => {
    // Arrange
    await page.goto("http://whatsmyuseragent.org/");

    // Act
    await page.screenshot({ path: "images/example.png" });
  });
});
