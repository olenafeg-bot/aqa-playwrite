
import { test as base } from '@playwright/test';
import GaragePage from '../pom/GaragePage.js';

export const test = base.extend({
  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);

    await garagePage.open();
    await garagePage.isVisible();

    await use(garagePage);
  },
});

export { expect } from '@playwright/test';
``
