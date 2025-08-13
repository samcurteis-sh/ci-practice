import { test, expect } from "@playwright/test";

test("says hello", async ({ page }) => {
  await page.goto("http://localhost:3001/");

  const heading = page.getByTestId(/heading/);
  // Expect a title "to contain" a substring.
  await expect(heading).toHaveText(/Hello world!/);
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
