import {ChangeDisplacement} from '../../Action/ChangeDisplacement';
import {SheetFake} from '../../SheetFake';
import {RaceAbilityName} from '../RaceAbilityName';
import {SlowAndAlways} from './SlowAndAlways';

describe('SlowAndAlways', () => {
	it('should dispatch displacement change', () => {
		const slowAndAlways = new SlowAndAlways();
		const sheet = new SheetFake();
		slowAndAlways.apply(sheet);

		expect(sheet.dispatch).toHaveBeenCalledWith(new ChangeDisplacement({
			displacement: 6,
			source: RaceAbilityName.slowAndAlways,
		}));
	});
});
