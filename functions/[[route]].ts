import puppeteer from '@cloudflare/puppeteer';

export async function onRequestGet({request, env}) {
  const url = new URL(request.url);

  // 只處理 /api/generate-image 路徑
  if (!url.pathname.startsWith('/api/generate-image')) {
    return new Response('Not Found', {status: 404});
  }

  try {
    // 啟動瀏覽器
    const browser = await puppeteer.launch(env.MYBROWSER);
    const page = await browser.newPage();

    // 設定視窗大小
    await page.setViewport({
      width: 800,
      height: 600,
      deviceScaleFactor: 2,
    });

    // 建構預覽頁面的 URL
    const previewUrl = new URL(url.origin);
    previewUrl.pathname = '/preview';
    previewUrl.search = url.search;

    // 導航到預覽頁面
    await page.goto(previewUrl.toString(), {
      waitUntil: 'networkidle0',
    });

    // 等待發票元素載入
    await page.waitForSelector('#invoice-preview');

    // 截圖
    const screenshot = await page.screenshot({
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        width: 800,
        height: 600,
      },
      omitBackground: true,
    });

    // 關閉瀏覽器
    await browser.close();

    // 回傳圖片
    return new Response(screenshot, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error generating invoice image:', error);
    return new Response('Failed to generate invoice image', {status: 500});
  }
}
