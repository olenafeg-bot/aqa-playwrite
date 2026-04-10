
import BasePage from './BasePage';
class Registration extends BasePage {
    constructor(page) {
        super(page, 'https://qauto.forstudy.space/');
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
        this.nameInput = page.locator('#signupName');
        this.lastNameInput = page.locator('#signupLastName');
        this.emailInput = page.locator('#signupEmail');
        this.passwordInput = page.locator('#signupPassword');
        this.repeatPasswordInput = page.locator('#signupRepeatPassword');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.errorMessage = page.locator('.invalid-feedback');
    }
    async openRegistrationForm() {
        await this.signUpButton.click();
    }
    async fillName(value) {
        await this.nameInput.fill(value.trim());
    }
    async fillLastName(value) {
        await this.lastNameInput.fill(value.trim());
    }
    async fillEmail(value) {
        await this.emailInput.fill(value);
    }
    async fillPassword(value) {
        await this.passwordInput.fill(value);
    }
    async fillRepeatPassword(value) {
        await this.repeatPasswordInput.fill(value);
    }
    
    async clearName() {
        await this.nameInput.clear();
    }
    
    async clearPassword() {
        await this.passwordInput.clear();
    }

    async clearRepeatPassword() {
        await this.repeatPasswordInput.clear();
    }
    async clearEmail() {
        await this.emailInput.clear();
    }
    
    async clearLastName() {
        await this.lastNameInput.clear();
    }
    async clickLastName() {
        await this.lastNameInput.click();
    }
    async clickPassword() {
        await this.passwordInput.click();
    }
    async clickRepeatPassword() {
        await this.repeatPasswordInput.click();
    }
    async clickEmail() {
        await this.emailInput.click();
    }
    async clickRegister() {
        await this.registerButton.click();
    }
    getErrorMessage(text) {
        return this.page.locator('.invalid-feedback', { hasText: text });
    }
    incorrectPasswordErrorMessage() {
        return this.page.locator('.invalid-feedback').filter({ hasText: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter' });
    }
    async isRegisterButtonDisabled() {
        return await this.registerButton.isDisabled();
    }

    async isErrorMessageVisible(text) {
        return this.page.locator('.invalid-feedback', { hasText: text });
    }
    async fillRegistrationForm(name, lastName, email, password, repeatPassword) {
        await this.fillName(name);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.fillRepeatPassword(repeatPassword);
    }
}

export default Registration;