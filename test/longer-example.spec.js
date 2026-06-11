const { test, expect } = require('@playwright/test');

test.describe('Bakehouse website tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    // test('homepage loads and key content is visible', async ({ page }) => {
    //     await expect(page).toHaveTitle('client');

    //     const heading = page.locator('h2').first();
    //     await expect(heading).toBeVisible();

    //     const headingText = await heading.textContent();
    //     expect(headingText).toMatch('Welcome to the Bakehouse');
    // });

    // test('can check links on the homepage', async ({ page }) => {
    //     const links = page.locator('a');

    //     await expect(links.first()).toBeVisible();

    //     const linkCount = await links.count();
    //     expect(linkCount).toBe(9);

    //     console.log(`Found ${linkCount} links on the page`);
    // });

    // test('can navigate to products', async ({ page }) => {
    //     const firstLink = page.getByText('Products');

    //     await firstLink.click();

    //     await expect(page.locator('h2')).toHaveText('Products');

    // });

    // test('can add new product', async ({ page }) => {
    //     const newProd = page.getByText('New Product');

    //     await newProd.click();

    //     let randomNum = Math.floor(Math.random() * 1000);

    //     await page.getByLabel('Product Name').fill(`Test Product ${randomNum}`);
    //     await page.getByLabel('Category').fill('Category');
    //     await page.getByLabel('Price').fill('10.99');
    //     await page.locator('button[type="submit"]').click();

    //     await expect(page.locator('css=form p')).toHaveText('Product created ✔️');

    // });

    // test('can add new customer', async ({ page }) => {
    //     const newCust = page.getByText('New Customer');

    //     await newCust.click();

    //     let randomNum = Math.floor(Math.random() * 1000);

    //     await page.getByLabel('Full Name').fill(`Carter's Child No. ${randomNum}`);
    //     await page.getByLabel('Email Address').fill(`carter.child.${randomNum}@hotmail.com`);
    //     //await page.getByLabel('Price').fill('10.99');
    //     await page.locator('button[type="submit"]').click();
    //     //await expect(page.locator('css=form p')).toHaveText('Customer created ✔️');
    //     await expect(page.locator('._success_10074_77')).toHaveText('Customer created ✔️');

    // });

    // test('can add new carter order', async ({ page }) => {
    //     const newOrd = page.getByText('New Order');

    //     await newOrd.click();

    //     let randomNum = Math.floor(Math.random() * 1000);

    //     // Selects Bob Dough from the customer dropdown
    //     await page.getByLabel('Customer').selectOption('Carter');
    //     await page.locator('._itemRow_1y2yw_40 select').selectOption('Will');

    //     //await page.getByLabel('Email Address').fill(`carter.child.${randomNum}@hotmail.com`);
    //     //await page.getByLabel('Price').fill('10.99');
    //     //await page.locator('button[type="submit"]').click();
    //     //await expect(page.locator('css=form p')).toHaveText('Customer created ✔️');
    //     await page.locator('._itemRow_1y2yw_40 input[type="number"]').fill(99);
        
    //     //await expect(page.locator('._success_10074_77')).toHaveText('Customer created ✔️');
    //     await page.waitForTimeout(500);
    //     await expect(page.locator('button[type="submit"]')).toBeEnabled();
    //     await page.locator('button[type="submit"]').click();
    //     await expect(page.getByText('Order created')).toBeVisible();

    // });

    test('can add new carter order', async ({ page }) => {

    const newOrd = page.getByText('New Order');
    await newOrd.click();

    await expect(page.locator('form._form_1y2yw_6')).toBeVisible();


    const customerDropdown = page.getByLabel('Customer');
    await customerDropdown.selectOption('Carter');

    const productDropdown = page.locator('._itemRow_1y2yw_40 select');
    await productDropdown.selectOption('Will');


    const quantityInput = page.locator('._itemRow_1y2yw_40 input[type="number"]');
    await quantityInput.fill('101');
    await expect(quantityInput).toHaveValue('101');
    await page.waitForTimeout(5000);
 
    const submitBtn = page.locator('button[type="submit"]._submit_1y2yw_66');

    await expect(submitBtn).toBeEnabled();
    console.log('"Create order" button is enabled.');


    await submitBtn.click();
    console.log('BUTTON CLOCKED WAIT FOR POPUP');
    await page.waitForTimeout(2000);

    const newProd = page.getByText('New Product');

    await newProd.click();

    await page.waitForTimeout(5000);
    

    // const alertPromise = page.waitForEvent('dialog');
    // await page.locator('button[type="submit"]._submit_1y2yw_66').click();
    // expect((await alertPromise).message()).toBe('Order created');

    

});



//`${randomNum}`
});
