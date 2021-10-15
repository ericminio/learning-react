import { 
    onceUponATime,
    somethingCrazyHappened,
    andTheWorldWasChangedForever,
} from './steps'

describe('journey', ()=>{

    it('can be told as a story', ()=>{
        onceUponATime();
        somethingCrazyHappened();

        andTheWorldWasChangedForever();  
    });
});