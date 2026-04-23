
import { test, expect } from '../support/fixtures/userGaragePage.js';

test('authorized user can see garage page', async ({ userGaragePage }) => {
  await userGaragePage.isVisible();
});
