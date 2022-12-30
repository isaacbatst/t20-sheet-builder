import {LearnSpell} from '../../Action/AddSpell';
import {RoleAbilityName} from '../../Role/RoleAbilityName';
import {SheetFake} from '../../Sheet/SheetFake';
import {FlamesExplosion} from './FlamesExplosion';

describe('FlameExplosion', () => {
	it('should dispatch spell learn', () => {
		const sheet = new SheetFake();
		const flamesExplosion = new FlamesExplosion();
		const dispatch = jest.fn();

		flamesExplosion.addToSheet(sheet, dispatch, RoleAbilityName.arcanistSpells);

		expect(dispatch).toHaveBeenCalledWith(new LearnSpell({
			spell: flamesExplosion,
			source: RoleAbilityName.arcanistSpells,
		}), sheet);
	});
});

