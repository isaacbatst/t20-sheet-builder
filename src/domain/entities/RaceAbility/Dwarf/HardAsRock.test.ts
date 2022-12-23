import {AddModifierToLifePoints} from '../../Action/AddModifierToLifePoints';
import {Modifier} from '../../Modifier/Modifier';
import {BuildingSheetFake} from '../../BuildingSheetFake';
import {RaceAbilityName} from '../RaceAbilityName';
import {HardAsRock} from './HardAsRock';

describe('HardAsRock', () => {
	it('should dispatch addOtherModifierToLifePoints', () => {
		const hardAsRock = new HardAsRock();
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		hardAsRock.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new AddModifierToLifePoints({
			modifier: new Modifier(RaceAbilityName.hardAsRock, 3),
		}));
	});
});
