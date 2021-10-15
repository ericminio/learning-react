import { 
    givenWeOpenTheFirstPage, 
    whenWeContinueToNextPage,
    thenWeSeeTheSecondPage,
} from './steps'

describe('journey', ()=>{

    it('can be told as a story', ()=>{
        givenWeOpenTheFirstPage();
        whenWeContinueToNextPage();

        thenWeSeeTheSecondPage();  
    });
});