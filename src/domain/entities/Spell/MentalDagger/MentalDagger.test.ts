import {LearnSpell} from '../../Action/AddSpell';
import {RoleAbilityName} from '../../Role/RoleAbilityName';
import {SheetFake} from '../../Sheet/SheetFake';
import {MentalDagger} from './MentalDagger';
import {vi} from 'vitest';

describe('MentalDagger', () => {
	it('should dispatch spell learn', () => {
		const sheet = new SheetFake();
		const dispatch = vi.fn();
		const mentalDagger = new MentalDagger();

		mentalDagger.addToSheet(sheet, dispatch, RoleAbilityName.arcanistSpells);

		expect(dispatch).toHaveBeenCalledWith(
			new LearnSpell({source: RoleAbilityName.arcanistSpells, spell: mentalDagger}),
			sheet,
		);
	});
});
