import {AddFixedModifierToLifePoints} from '../../Action/AddFixedModifierToLifePoints';
import {AddPerLevelModifierToLifePoints} from '../../Action/AddPerLevelModifierToLifePoints';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../../Modifier/PerLevelModifier/PerLevelModifier';
import {RaceName} from '../../Race/RaceName';
import {BuildingSheetFake} from '../../Sheet/BuildingSheetFake';
import {RaceAbilityName} from '../RaceAbilityName';
import {HardAsRock} from './HardAsRock';

describe('HardAsRock', () => {
	it('should dispatch addOtherModifierToLifePoints', () => {
		const hardAsRock = new HardAsRock();
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		hardAsRock.addToSheet(sheet, dispatch, RaceName.dwarf);

		expect(dispatch).toHaveBeenCalledWith(new AddFixedModifierToLifePoints({
			modifier: new FixedModifier(RaceAbilityName.hardAsRock, 3),
		}), sheet);
	});

	it('should dispatch addPerLevelModifierToLifePoints', () => {
		const hardAsRock = new HardAsRock();
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		hardAsRock.addToSheet(sheet, dispatch, RaceName.dwarf);

		expect(dispatch).toHaveBeenCalledWith(new AddPerLevelModifierToLifePoints({
			modifier: new PerLevelModifier(RaceAbilityName.hardAsRock, 1, false),
		}), sheet);
	});
});
