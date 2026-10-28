import { spawn } from "node:child_process";
import http from "node:http";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;
const PREVIEW_URL = "http://localhost:3000/preview";

function getJson(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

async function run() {
  console.log("Launching headless Google Chrome...");
  const chromeProc = spawn(
    CHROME_PATH,
    [
      "--headless=new",
      `--remote-debugging-port=${PORT}`,
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  // Wait for Chrome CDP port to be ready
  let versionInfo: any = null;
  for (let i = 0; i < 20; i++) {
    try {
      versionInfo = await getJson(`http://127.0.0.1:${PORT}/json/version`);
      if (versionInfo) break;
    } catch {
      await new Promise((r) => setTimeout(r, 250));
    }
  }

  if (!versionInfo) {
    chromeProc.kill();
    throw new Error("Failed to connect to headless Chrome CDP port.");
  }

  console.log("Connected to Chrome:", versionInfo.Browser);

  // Find existing target or connect to it
  const targets = await getJson(`http://127.0.0.1:${PORT}/json`);
  const pageTarget = targets.find((t: any) => t.type === "page") || targets[0];
  const wsUrl = pageTarget.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);

  let msgId = 1;
  const pendingRequests = new Map<number, (res: any) => void>();

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data.toString());
    if (data.id && pendingRequests.has(data.id)) {
      const cb = pendingRequests.get(data.id)!;
      pendingRequests.delete(data.id);
      cb(data);
    }
  };

  await new Promise((r) => (ws.onopen = r));

  function sendCommand(method: string, params: any = {}): Promise<any> {
    const id = msgId++;
    return new Promise((resolve) => {
      pendingRequests.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await sendCommand("Page.enable");
  await sendCommand("DOM.enable");
  await sendCommand("CSS.enable");

  await sendCommand("Page.navigate", { url: PREVIEW_URL });
  // Wait 2.5s for page to settle
  await new Promise((r) => setTimeout(r, 2500));

  // --- Test 1: Desktop Viewport (1440 x 900) ---
  console.log("\n=== Viewport 1: Desktop (1440 x 900) ===");
  await sendCommand("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await new Promise((r) => setTimeout(r, 500));

  const desktopEval = await sendCommand("Runtime.evaluate", {
    expression: `(() => {
      const primaryBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Primary Action'));
      const input = document.querySelector('input');
      const desktopNav = document.querySelector('nav');
      const hamburger = document.querySelector('button[aria-label="Toggle navigation menu"]');

      const btnStyles = primaryBtn ? window.getComputedStyle(primaryBtn) : null;
      const inputStyles = input ? window.getComputedStyle(input) : null;
      const navStyles = desktopNav ? window.getComputedStyle(desktopNav) : null;
      const hamburgerStyles = hamburger ? window.getComputedStyle(hamburger) : null;

      return {
        primaryButton: btnStyles ? {
          height: btnStyles.height,
          borderRadius: btnStyles.borderRadius,
          backgroundColor: btnStyles.backgroundColor,
          color: btnStyles.color,
          fontSize: btnStyles.fontSize,
        } : null,
        input: inputStyles ? {
          height: inputStyles.height,
          borderRadius: inputStyles.borderRadius,
          borderColor: inputStyles.borderColor,
          backgroundColor: inputStyles.backgroundColor,
        } : null,
        desktopNavDisplay: navStyles ? navStyles.display : null,
        hamburgerDisplay: hamburgerStyles ? hamburgerStyles.display : null,
      };
    })()`,
    returnByValue: true,
  });
  console.log("Desktop Results:", JSON.stringify(desktopEval.result?.value ?? desktopEval, null, 2));

  // --- Test 2: Tablet Viewport (1024 x 768) ---
  console.log("\n=== Viewport 2: Tablet (1024 x 768) ===");
  await sendCommand("Emulation.setDeviceMetricsOverride", {
    width: 1024,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await new Promise((r) => setTimeout(r, 500));

  const tabletEval = await sendCommand("Runtime.evaluate", {
    expression: `(() => {
      const desktopNav = document.querySelector('nav');
      const hamburger = document.querySelector('button[aria-label="Toggle navigation menu"]');
      const navStyles = desktopNav ? window.getComputedStyle(desktopNav) : null;
      const hamburgerStyles = hamburger ? window.getComputedStyle(hamburger) : null;

      return {
        desktopNavDisplay: navStyles ? navStyles.display : null,
        hamburgerVisible: hamburgerStyles && hamburgerStyles.display !== 'none',
      };
    })()`,
    returnByValue: true,
  });
  console.log("Tablet (1024px) Navigation Collapse Results:", JSON.stringify(tabletEval.result?.value ?? tabletEval, null, 2));

  // --- Test 3: Mobile Viewport (390 x 844 - iPhone 14/15) ---
  console.log("\n=== Viewport 3: Mobile (390 x 844) ===");
  await sendCommand("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 500));

  const mobileEval = await sendCommand("Runtime.evaluate", {
    expression: `(() => {
      const fullWidthBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Confirm Booking'));
      const input = document.querySelector('input');
      const btnStyles = fullWidthBtn ? window.getComputedStyle(fullWidthBtn) : null;
      const inputStyles = input ? window.getComputedStyle(input) : null;

      return {
        fullWidthButton: btnStyles ? {
          width: btnStyles.width,
          height: btnStyles.height,
          borderRadius: btnStyles.borderRadius,
        } : null,
        mobileInput: inputStyles ? {
          width: inputStyles.width,
          height: inputStyles.height,
          borderRadius: inputStyles.borderRadius,
        } : null,
      };
    })()`,
    returnByValue: true,
  });
  console.log("Mobile (390px) Results:", JSON.stringify(mobileEval.result?.value ?? mobileEval, null, 2));

  // Clean up
  ws.close();
  chromeProc.kill();
  console.log("\nVerification successfully completed.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
