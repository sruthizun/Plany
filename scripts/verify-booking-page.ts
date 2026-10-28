import { spawn } from "node:child_process";
import http from "node:http";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9224;
const BOOKING_URL = "http://localhost:3000/alex/30-min-chat";

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
  console.log("Launching headless Google Chrome for Booking Page verification...");
  const chromeProc = spawn(
    CHROME_PATH,
    [
      "--headless=new",
      `--remote-debugging-port=${PORT}`,
      "--disable-gpu",
      "--no-sandbox",
      "about:blank",
    ],
    { stdio: "ignore" }
  );

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

  const targets = await getJson(`http://127.0.0.1:${PORT}/json`);
  const pageTarget = targets.find((t: any) => t.type === "page") || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

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
  await sendCommand("Page.navigate", { url: BOOKING_URL });
  await new Promise((r) => setTimeout(r, 3000));

  // --- Test 1: Desktop Viewport (1440 x 900) ---
  console.log("\n=== Viewport 1: Desktop (1440 x 900) ===");
  await sendCommand("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await new Promise((r) => setTimeout(r, 500));

  const desktopMeasurements = await sendCommand("Runtime.evaluate", {
    expression: `(() => {
      const card = document.querySelector('.max-w-\\\\[1000px\\\\]');
      const timeButtons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent?.includes('AM') || b.textContent?.includes('PM'));
      const activeDateBtn = document.querySelector('button.bg-\\\\[\\\\#071a31\\\\]');
      const hostHeading = document.querySelector('h1');

      const cardStyles = card ? window.getComputedStyle(card) : null;
      const firstSlot = timeButtons[0] ? window.getComputedStyle(timeButtons[0]) : null;

      return {
        card: cardStyles ? {
          width: cardStyles.width,
          maxWidth: cardStyles.maxWidth,
          borderRadius: cardStyles.borderRadius,
          backgroundColor: cardStyles.backgroundColor,
        } : null,
        firstTimeSlotButton: firstSlot ? {
          height: firstSlot.height,
          borderRadius: firstSlot.borderRadius,
          color: firstSlot.color,
          fontSize: firstSlot.fontSize,
        } : null,
        timeSlotsCount: timeButtons.length,
        hostTitle: hostHeading ? hostHeading.textContent : null,
        activeDateText: activeDateBtn ? activeDateBtn.textContent : null,
      };
    })()`,
    returnByValue: true,
  });
  const extractValue = (res: any) => res?.result?.result?.value ?? res?.result?.value ?? res?.result ?? res;
  console.log("Desktop Measurements:", JSON.stringify(extractValue(desktopMeasurements), null, 2));

  // --- Interactive Slot Selection & "Next" Transition Test ---
  console.log("\n--- Testing Interactive Slot Click & 'Next' Transition ---");
  const clickSlotEval = await sendCommand("Runtime.evaluate", {
    expression: `(() => {
      const timeButtons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent?.includes('AM') || b.textContent?.includes('PM'));
      if (timeButtons.length > 0) {
        timeButtons[0].click();
        return true;
      }
      return false;
    })()`,
    returnByValue: true,
  });

  await new Promise((r) => setTimeout(r, 400));

  const nextBtnEval = await sendCommand("Runtime.evaluate", {
    expression: `(() => {
      const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.trim() === 'Next');
      if (nextBtn) {
        const styles = window.getComputedStyle(nextBtn);
        return {
          found: true,
          height: styles.height,
          borderRadius: styles.borderRadius,
          backgroundColor: styles.backgroundColor,
          color: styles.color,
        };
      }
      return { found: false };
    })()`,
    returnByValue: true,
  });
  console.log("Next Button Appearance:", JSON.stringify(extractValue(nextBtnEval), null, 2));

  // Click "Next" to reveal the form preview
  await sendCommand("Runtime.evaluate", {
    expression: `(() => {
      const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.trim() === 'Next');
      if (nextBtn) nextBtn.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 500));

  const formEval = await sendCommand("Runtime.evaluate", {
    expression: `(() => {
      const nameInput = document.querySelector('input[placeholder="Jane Doe"]');
      const emailInput = document.querySelector('input[placeholder="jane@example.com"]');
      const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Schedule Event'));

      return {
        formVisible: Boolean(nameInput && emailInput),
        nameInputHeight: nameInput ? window.getComputedStyle(nameInput).height : null,
        submitButtonText: submitBtn ? submitBtn.textContent?.trim() : null,
      };
    })()`,
    returnByValue: true,
  });
  console.log("Form Preview State:", JSON.stringify(extractValue(formEval), null, 2));

  // --- Test 2: Tablet Viewport (1024 x 768) ---
  console.log("\n=== Viewport 2: Tablet (1024 x 768) ===");
  await sendCommand("Emulation.setDeviceMetricsOverride", {
    width: 1024,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await new Promise((r) => setTimeout(r, 400));

  const tabletMeasurements = await sendCommand("Runtime.evaluate", {
    expression: `(() => {
      const card = document.querySelector('.max-w-\\\\[1000px\\\\]');
      return card ? { width: window.getComputedStyle(card).width } : null;
    })()`,
    returnByValue: true,
  });
  console.log("Tablet (1024px) Width:", JSON.stringify(extractValue(tabletMeasurements), null, 2));

  // --- Test 3: Mobile Viewport (390 x 844) ---
  console.log("\n=== Viewport 3: Mobile (390 x 844) ===");
  await sendCommand("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 400));

  const mobileMeasurements = await sendCommand("Runtime.evaluate", {
    expression: `(() => {
      const card = document.querySelector('.max-w-\\\\[1000px\\\\]');
      const nameInput = document.querySelector('input[placeholder="Jane Doe"]');
      const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Schedule Event'));

      return {
        cardWidth: card ? window.getComputedStyle(card).width : null,
        inputHeight: nameInput ? window.getComputedStyle(nameInput).height : null,
        submitBtnHeight: submitBtn ? window.getComputedStyle(submitBtn).height : null,
      };
    })()`,
    returnByValue: true,
  });
  console.log("Mobile (390px) Sizing:", JSON.stringify(extractValue(mobileMeasurements), null, 2));

  ws.close();
  chromeProc.kill();
  console.log("\nBooking page verification completed.");
}

run().catch((e) => {
  console.error("Verification error:", e);
  process.exit(1);
});
