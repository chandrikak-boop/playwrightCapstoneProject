import {test} from '@playwright/test';
test('C38 User can Login', async ({ page }) => {
  await page.goto('https://automationexercise.com');
  console.log(`${process.env.TESTRAIL_USERNAME}`);
  
  // test logic
});

test.skip('C39 Tesing Failed Testcase',async({page})=>{
    await page.goto('https://aumationexercise.com')

})