import {LearnSpell} from '../../Action/AddSpell';
import {RoleAbilityName} from '../../Role/RoleAbilityName';
import {SheetFake} from '../../Sheet/SheetFake';
import {MentalDagger} from './MentalDagger';

describe('MentalDagger', () => {
	it('should dispatch spell learn', () => {
		const sheet = new SheetFake();
		const dispatch = jest.fn();
		const mentalDagger = new MentalDagger();

		mentalDagger.addToSheet(sheet, dispatch, RoleAbilityName.arcanistSpells);

		expect(dispatch).toHaveBeenCalledWith(
			new LearnSpell({source: RoleAbilityName.arcanistSpells, spell: mentalDagger}),
			sheet,
		);
	});
});
