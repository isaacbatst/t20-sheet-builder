import {AddModifierToLifePoints} from '../../Action/AddModifierToLifePoints';
import {Modifier} from '../../Modifier/Modifier';
import {BuildingSheetFake} from '../../SheetFake';
import {RaceAbilityName} from '../RaceAbilityName';
import {HardAsRock} from './HardAsRock';

describe('HardAsRock', () => {
	it('should dispatch addOtherModifierToLifePoints', () => {
		const hardAsRock = new HardAsRock();
		const sheet = new BuildingSheetFake();
		hardAsRock.apply(sheet);

		expect(sheet.dispatch).toHaveBeenCalledWith(new AddModifierToLifePoints({
			modifier: new Modifier(RaceAbilityName.hardAsRock, 3),
		}));
	});
});
