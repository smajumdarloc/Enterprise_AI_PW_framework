import { Page } from '@playwright/test'; 
export class Header { 
    constructor(private page: Page) 
    { } 
    
    async openMenu() {
         await this.page.locator('#react-burger-menu-btn').click();

    } 
    async logout() {
         await this.openMenu();
        await this.page.locator('#logout_sidebar_link').click(); 
    }
 }