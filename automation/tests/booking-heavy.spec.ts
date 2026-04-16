import { test, expect } from "@playwright/test";

test("heavy booking flow with disabled skips", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Enter postcode").fill("SW1A 1AA");
  await page.getByRole("button", { name: "Lookup" }).click();

  await page.getByRole("button", { name: /10 Downing Street/i }).click();
  await page.getByRole("button", { name: "Heavy" }).click();

  const disabledSkip = page.getByRole("button", { name: /12-yard/i });
  await expect(disabledSkip).toBeDisabled();

  await page.getByRole("button", { name: /10-yard/i }).click();

  await expect(page.getByText(/Waste type:/i)).toBeVisible();

  await page.getByRole("button", { name: /Confirm Booking/i }).click();

  await expect(
    page.getByText(/Booking confirmed successfully/i)
  ).toBeVisible();
});