import {test} from '@playwright/test'; 
import {analyzeFailure} from '../ai/failureAnalyzer'; 

test.afterEach(async ({ }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        const analysis = await analyzeFailure(testInfo.errors.map(e => e.message).join(' ')); 
        console.log(' 🤖 AI Analysis: '); 
        console.log(analysis);
    }
});