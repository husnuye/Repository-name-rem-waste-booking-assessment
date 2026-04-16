import { test, expect } from "@playwright/test";

test("general booking flow", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Enter postcode").fill("SW1A 1AA");
  await page.getByRole("button", { name: "Lookup" }).click();

  await page.getByRole("button", { name: /10 Downing Street/i }).click();
  await page.getByRole("button", { name: "General" }).click();



  await page.getByRole("button", { name: "4-yard - £120" }).click();

  await expect(page.getByText("Review")).toBeVisible();
  await expect(page.getByText(/Price breakdown/i)).toBeVisible();

  await page.getByRole("button", { name: /Confirm Booking/i }).click();

  await expect(
    page.getByText(/Booking confirmed successfully/i)
  ).toBeVisible();
  await expect(page.getByText(/ID:/i)).toBeVisible();
});