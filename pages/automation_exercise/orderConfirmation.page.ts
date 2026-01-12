import { Page, Locator } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

class OrderConfirmation {
  page: Page;
  downloadInvoiceBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.downloadInvoiceBtn = page.getByRole('link', { name: 'Download Invoice' });
  }

  async downloadInvoiceFunc() {
    const downloadDir = path.resolve('invoices');
    fs.mkdirSync(downloadDir, { recursive: true });

    // Wait for download BEFORE clicking
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadInvoiceBtn.click()
    ]);

    // Create datetime-safe filename
    const timestamp = new Date()
      .toISOString()
    //   .replace(/[:.]/g, '-')
    //   .replace('T', '_')
    //   .split('Z')[0];

    const originalName = download.suggestedFilename();
    const ext = path.extname(originalName);
    const base = path.basename(originalName, ext);

    const fileName = `${base}_${timestamp}${ext}`;
    const filePath = path.join(downloadDir, fileName);

    await download.saveAs(filePath);

    console.log(`Invoice downloaded: ${filePath}`);
  }
}

export default OrderConfirmation;