import { expect } from '@playwright/test';
class BasePage {
    constructor(page, url) {
        this.page = page;
        this.url = url;
        
      
    }

    async open() {
        await this.page.goto(this.url);
       
    }

    async back() {
        await this.page.goBack();
    }

    async forward() {
        await this.page.goForward();
    }

    async reload() {
        await this.page.reload();
    }
}

export default BasePage;