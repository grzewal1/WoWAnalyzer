import T20_4pc from 'Parser/BrewmasterMonk/Modules/Items/T20_4pc';
import { events, processEvents } from './Fixtures/SimpleFight';

const item = new T20_4pc();

describe('Brewmaster.T20_4pc', () => {
  beforeAll(() => {
    processEvents(events, item);
  });
  it('how many gift of the ox orbs were absorbed', () => {
    expect(item.orbsEaten).toBe(1);
  });
  it('how much stagger was reduced by absorbing the gift of the ox orbs', () => {
    expect(item.staggerSaved).toBe(15);
  });
});
  

