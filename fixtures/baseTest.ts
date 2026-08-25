import { test as base, expect } from './baseFixture';
import { processFailure } from '../utils/testHooks'; 

export const test = base; 
test.afterEach(async ({page}, testInfo) => { 
    // Skip setup project 
    if (testInfo.project.name === 'setup') 
        { return; } 
    await processFailure(page, testInfo);
 }); 
 export { expect };