import { 
    givenWeOpenThePage,
    givenWeOpenTheFirstPage,
    whenWeContinueToNextPage,
    thenWeSeeTheFirstPage,
    thenWeSeeTheSecondPage,
} from './steps'

describe('journey', ()=>{

    it('has a start', ()=>{
        givenWeOpenThePage("/one");

        thenWeSeeTheFirstPage();  
    });
    
    it('can be told as a story', ()=>{
        givenWeOpenTheFirstPage();
        whenWeContinueToNextPage();

        thenWeSeeTheSecondPage();  
    });

    it('can have shortcut', ()=>{
        givenWeOpenThePage("/two");

        thenWeSeeTheSecondPage();  
    });
});