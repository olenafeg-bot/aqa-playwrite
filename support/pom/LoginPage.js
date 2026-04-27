import BasePage from "./BasePage.js";

class LoginPage extends BasePage {
    constructor(page) {
        super(page, '/');

        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.emailInput = page.locator('input[type="text"]');
        this.passwordInput = page.locator('input[type="password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async openLogin() {
        await this.signInButton.click();
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

export default LoginPage;
