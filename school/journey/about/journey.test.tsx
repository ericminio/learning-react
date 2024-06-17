import { once, when, then } from './steps';

describe('journey', () => {
    it('can be told as a story', async () => {
        once.uponATime();
        await when.somethingCrazyHappened();

        then.theWorldWasChangedForever();
    });
});
