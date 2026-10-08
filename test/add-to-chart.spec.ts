import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    //Open the page
    await page.goto('https://practicesoftwaretesting.com/');
    await expect(page.getByText('Practice Black Box Testing & Bug Hunting')).toBeVisible();

    //Click item = Combination Pliers
    //await page.locator('[data-test="product-name"]', {hasText: 'Combination Pliers'}).click();
    await page.getByRole('img', { name: 'Combination Pliers' }).click();
    await expect(page).toHaveURL(/product/);

    //input quantity = 2
    await page.locator('[id="quantity-input"]').fill('2');

    //Click Add to Cart
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    await expect(page.getByText('Product added to shopping cart.')).toBeVisible();

    //Click View Cart
    //await page.locator('[data-test="nav-cart"]').click();
    await page.getByRole('link', { name: 'cart' }).click();
    await expect(page).toHaveURL(/checkout/);

// Step 1: Verify Cart
    // ตรวจสอบว่ามีสินค้า Combination Pliers
    await expect( page.getByText('Combination Pliers', { exact: true })).toBeVisible();

    // ตรวจสอบ Quantity = 2
    //await expect(page.locator('[data-test="product-quantity"]')).toHaveValue('2');
    await expect(page.getByRole('spinbutton', { name: 'Quantity' })).toHaveValue('2');

    // ตรวจสอบ Total Price = $28.30
    await expect(page.locator('[data-test="line-price"]')).toHaveText('$28.30');

    // กดปุ่ม Proceed to checkout
    await page.getByRole('button', { name: 'Proceed to checkout' }).click();

// Step 2: Verify Sign In
    // Tab:Continue as Guest กรอกข้อมูล Email address, First name, Last name
    await page.getByRole('tab', { name: 'Continue as Guest' }).click();
    await page.locator('[data-test="guest-email"]').fill('test@gmail.com');
    await page.locator('[data-test="guest-first-name"]').fill('test');
    await page.locator('[data-test="guest-last-name"]').fill('test');
    // Click Continue as Guest
    await page.getByRole('button', { name: 'Continue as Guest' }).click();
    await page.getByRole('button', { name: 'Proceed to checkout' }).click();
//Step 3: Billing Address
    await page.getByRole('combobox').selectOption({ label: 'Thailand' });
    await expect(page.getByRole('combobox')).toHaveValue('TH');
});