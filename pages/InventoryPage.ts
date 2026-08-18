import { Page, Locator, expect } from '@playwright/test'; 

export class InventoryPage { 
    readonly page: Page; 
    readonly inventoryList: Locator; 
    readonly firstAddToCartButton: Locator; 
   
    
    constructor(page: Page) {
         this.page = page; 
         this.inventoryList = page.locator('.inventory_list'); 
         this.firstAddToCartButton = page.locator('.inventory_item button').first(); 
        } 
        
        async waitForPage() {
             await this.page.goto('/inventory.html');
             await expect(this.inventoryList).toBeVisible();
             await expect(this.page).toHaveURL(/inventory\.html/);
        }

        async addFirstProductToCart() {
             await this.firstAddToCartButton.click();

        }

        
    }