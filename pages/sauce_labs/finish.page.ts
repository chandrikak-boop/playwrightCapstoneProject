import { Locator, Page } from '@playwright/test';
class FinishPage { 
    finishButton:Locator;
    constructor(page:Page) { 
        this.finishButton=page.getByRole('button',{name:'Finish'});  
}
    async clickFinish(){
        await this.finishButton.click();
    }
}
export default FinishPage;