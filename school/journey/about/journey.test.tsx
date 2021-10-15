import { once, when, then } from './steps'

describe('journey', ()=>{

    it('can be told as a story', ()=>{
        once.uponATime();
        when.somethingCrazyHappened();

        then.theWorldWasChangedForever();  
    });
});