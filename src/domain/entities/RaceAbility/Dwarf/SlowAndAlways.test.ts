import {ChangeDisplacement} from '../../Action/ChangeDisplacement';
import {BuildingSheetFake} from '../../SheetFake';
import {RaceAbilityName} from '../RaceAbilityName';
import {SlowAndAlways} from './SlowAndAlways';

describe('SlowAndAlways', () => {
	it('should dispatch displacement change', () => {
		const slowAndAlways = new SlowAndAlways();
		const sheet = new BuildingSheetFake();
		slowAndAlways.apply(sheet);

		expect(sheet.dispatch).toHaveBeenCalledWith(new ChangeDisplacement({
			displacement: 6,
			source: RaceAbilityName.slowAndAlways,
		}));
	});
});
