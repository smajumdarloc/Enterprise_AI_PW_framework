import { test, expect } from '../../fixtures/baseFixture';
import users from '../../data/users.json';

test('User can login Test', async ({ loginPage }) => {

    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await loginPage.verifyLogin();
});