import { Page, expect } from '@playwright/test'; 
export class LoginPage {


     private username: any;
     private password: any;
     private loginBtn: any;

     constructor(private page: Page) { 
         this.username = this.page.locator('#customer_email');
         this.password = this.page.locator('#customer_password');
         this.loginBtn = this.page.locator('input[type="submit"][value="Sign In"]');
     }


    async goto() { 
        await this.page.goto('/account/login'); 
    } 
    async login(user: string, pass: string) {
         await this.username.fill(user); 
         await this.password.fill(pass); 
         await this.loginBtn.click();
         } 
    async verifyLogin() { 
        await expect(this.page).toHaveURL(/account/); 
    } 
}