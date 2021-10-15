import { 
    givenWeOpenTheFirstStep, 
    whenWeContinueToNextStep,
    thenWeSeeTheSecondStep,
} from './steps'

describe('Two steps journey', ()=>{

    it('can be told as a story', ()=>{
        givenWeOpenTheFirstStep();
        whenWeContinueToNextStep();

        thenWeSeeTheSecondStep();  
    });
});