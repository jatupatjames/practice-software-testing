import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  await page.getByRole('img', { name: 'Combination Pliers' }).click();

  // Wait page to load.
  await expect(page.getByRole('heading', { name: 'Combination Pliers', level: 1 })).toBeVisible(({ timeout: 10000 }));
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await expect(page.locator('#toast-container')).toBeVisible();

  // Click on cart.
  await page.getByRole('link', { name: 'cart' }).click();
  await expect(page).toHaveURL(/\/checkout/);

  // Proceed to checkout.
  await page.getByRole('button', { name: 'Proceed to checkout' }).click();


  // Switch to "Continue as Guest" tab.
    await page.getByRole('tab', { name: 'Continue as Guest' }).click();

  // Fill in the checkout form.
    await page.locator('#guest-email').fill('abc@gmail.com');
    await page.getByLabel('First name').fill('Jatupat');
    await page.getByLabel('Last name').fill('James');

  // Click on the login button.  
    await page.getByRole('button', { name: 'Continue as Guest' }).click();

  // Proceed to checkout.
  await page.getByRole('button', { name: 'Proceed to checkout' }).click();
  await page.getByRole('combobox').selectOption({ label: 'Thailand' });
  await page.getByLabel('Postal code').fill('12120');
  await page.getByLabel('House number').fill('123/45');
  await page.getByLabel('Street').fill('Siam');
  await page.getByLabel('City').fill('Bangkok');
  await page.getByLabel('State').fill('Bangkok');

  // Proceed to checkout button should be enabled.
  await expect(page.getByRole('button', { name: 'Proceed to checkout' })).toBeEnabled();
  // Then click.
  await page.getByRole('button', { name: 'Proceed to checkout' }).click();

  // Choose payment method.
  await page.getByRole('combobox').selectOption({ label: 'Cash on Delivery' });
  await page.getByRole('button', { name: 'Check payment' }).click();

  await page.pause();


});