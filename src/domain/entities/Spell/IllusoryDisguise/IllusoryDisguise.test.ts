import {LearnSpell} from '../../Action/AddSpell';
import {RoleAbilityName} from '../../Role/RoleAbilityName';
import {SheetFake} from '../../Sheet/SheetFake';
import {IllusoryDisguise} from './IllusoryDisguise';
import {vi} from 'vitest';

describe('MentalDagger', () => {
	it('should dispatch spell learn', () => {
		const sheet = new SheetFake();
		const dispatch = vi.fn();
		const illusoryDisguise = new IllusoryDisguise();

		illusoryDisguise.addToSheet(sheet, dispatch, RoleAbilityName.arcanistSpells);

		expect(dispatch).toHaveBeenCalledWith(
			new LearnSpell({source: RoleAbilityName.arcanistSpells, spell: illusoryDisguise}),
			sheet,
		);
	});
});
