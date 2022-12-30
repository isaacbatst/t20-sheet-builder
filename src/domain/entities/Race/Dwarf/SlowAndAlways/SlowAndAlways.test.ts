import {ChangeDisplacement} from '../../../Action/ChangeDisplacement';
import {BuildingSheetFake} from '../../../Sheet/BuildingSheetFake';
import {RaceName} from '../../RaceName';
import {RaceAbilityName} from '../../RaceAbilityName';
import {SlowAndAlways} from './SlowAndAlways';

describe('SlowAndAlways', () => {
	it('should dispatch displacement change', () => {
		const slowAndAlways = new SlowAndAlways();
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		slowAndAlways.addToSheet(sheet, dispatch, RaceName.dwarf);

		expect(dispatch).toHaveBeenCalledWith(new ChangeDisplacement({
			displacement: 6,
			source: RaceAbilityName.slowAndAlways,
		}), sheet);
	});
});
