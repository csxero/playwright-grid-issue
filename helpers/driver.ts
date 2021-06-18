import { ChromiumBrowser, chromium, Page } from "playwright";
import { getExecutionType } from "./config";
import Internet from "./Internet";
import { TestInfo } from "./testingInfo";

let sessionId: string;
let browser: ChromiumBrowser;

export const deleteSession = async () => {
  await Internet.delete(`${TestInfo.GRID_URL}/wd/hub/session/${sessionId}`);
};

export const driverSetup = async (): Promise<Page> => {
  if (getExecutionType() === "grid") {
    browser = await gridSetup();
  } else {
    browser = await chromium.launch({
      args: ["--disable-web-security"],
      headless: true,
      downloadsPath: "",
    });
  }

  return browser.newPage();
};

export const gridSetup = async (): Promise<ChromiumBrowser> => {
  let count = 0;
  let queueExists = true;
  do {
    console.warn(`Waiting for queue to complete..`);
    const { data } = await Internet.get(
      `${TestInfo.GRID_URL}/se/grid/newsessionqueuer/queue`
    );
    if (data["value"].length !== 0) {
      await new Promise((r) => setTimeout(r, 1000));
      count++;
    } else {
      queueExists = false;
    }
  } while (queueExists && count < 120);

  console.warn(`Queue is empty..`);

  const { data } = await Internet.post(`${TestInfo.GRID_URL}/wd/hub/session`, {
    desiredCapabilities: {
      browserName: "chrome",
      acceptInsecureCerts: true,
      "se:options": {
        "se:timeZone": "Pacific/Auckland",
        "se:recordVideo": "true",
      },
    },
  });

  sessionId = data["sessionId"];

  return await chromium.connectOverCDP({
    wsEndpoint: `${TestInfo.GRID_URL}/session/${sessionId}/se/cdp`,
    timeout: 30000,
  });
};

export const tearDown = async (): Promise<void> => {
  if (null != browser) {
    await browser.close();
  }
  if (getExecutionType() === "grid") {
    await deleteSession();
  }
};
