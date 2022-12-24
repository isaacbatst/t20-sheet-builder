import {AddModifierToLifePoints} from '../../Action/AddModifierToLifePoints';
import {Modifier} from '../../Modifier/Modifier';
import {BuildingSheetFake} from '../../Sheet/BuildingSheetFake';
import {RaceAbilityName} from '../RaceAbilityName';
import {HardAsRock} from './HardAsRock';
import {AddPerLevelModifierToLifePoints} from '../../Action/AddPerLevelModifierToLifePoints';
import {PerLevelModifier} from '../../Modifier/PerLevelModifier';
import {RaceName} from '../../Race/RaceName';

describe('HardAsRock', () => {
	it('should dispatch addOtherModifierToLifePoints', () => {
		const hardAsRock = new HardAsRock();
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		hardAsRock.addToSheet(sheet, dispatch, RaceName.dwarf);

		expect(dispatch).toHaveBeenCalledWith(new AddModifierToLifePoints({
			modifier: new Modifier(RaceAbilityName.hardAsRock, 3),
		}));
	});

	it('should dispatch addPerLevelModifierToLifePoints', () => {
		const hardAsRock = new HardAsRock();
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		hardAsRock.addToSheet(sheet, dispatch, RaceName.dwarf);

		expect(dispatch).toHaveBeenCalledWith(new AddPerLevelModifierToLifePoints({
			modifier: new PerLevelModifier(1, true, RaceAbilityName.hardAsRock),
		}));
	});
});
