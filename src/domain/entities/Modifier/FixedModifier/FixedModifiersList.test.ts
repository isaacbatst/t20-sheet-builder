import {RaceAbilityName} from '../../RaceAbility/RaceAbilityName';
import {RoleName} from '../../Role/RoleName';
import {FixedModifier} from './FixedModifier';
import {FixedModifiersList} from './FixedModifiersList';
import {FixedModifiersListTotalCalculator} from './FixedModifiersListTotalCalculator';

describe('FixedModifiersList', () => {
	it('should calculate total', () => {
		const list = new FixedModifiersList();
		list.add(new FixedModifier(RaceAbilityName.hardAsRock, 3));
		list.add(new FixedModifier(RoleName.arcanist, 8, new Set(['constitution'])));
		const calculator = new FixedModifiersListTotalCalculator({charisma: 0, constitution: 2, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0});
		expect(list.getTotal(calculator)).toBe(13);
	});
});
