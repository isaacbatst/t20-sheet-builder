import {Level} from '../../Sheet/Level';
import {RoleAbilityName} from '../../Role/RoleAbilityName';
import {RoleName} from '../../Role/RoleName';
import {PerLevelModifier} from './PerLevelModifier';
import {PerLevelModifiersList} from './PerLevelModifiersList';
import {PerLevelModifiersListTotalCalculator} from './PerLevelModifiersListTotalCalculator';

describe('PerLevelModifiersList', () => {
	it('should calculate total', () => {
		const list = new PerLevelModifiersList();
		list.add(new PerLevelModifier({
			source: RoleName.arcanist,
			value: 6,
			includeFirstLevel: true,
			attributeBonuses: new Set(['intelligence']),
		}));
		list.add(new PerLevelModifier({
			source: RoleAbilityName.arcanistSpells,
			value: 1,
			includeFirstLevel: false,
		}));
		const calculator = new PerLevelModifiersListTotalCalculator(
			{charisma: 0, constitution: 0, dexterity: 0, intelligence: 2, strength: 0, wisdom: 0},
			Level.three,
		);
		expect(list.getTotal(calculator)).toBe(26);
	});

	it('should calculate total with custom frequency', () => {
		const list = new PerLevelModifiersList();
		list.add(new PerLevelModifier({
			source: RoleName.arcanist,
			value: 6,
			includeFirstLevel: true,
			attributeBonuses: new Set(['intelligence']),
		}));
		list.add(new PerLevelModifier({
			source: RoleAbilityName.arcanistSpells,
			value: 1,
			includeFirstLevel: false,
		}));
		list.add(new PerLevelModifier({
			source: RoleAbilityName.arcanistPath,
			value: 5,
			includeFirstLevel: false,
			frequency: 2,
		}));
		const calculator = new PerLevelModifiersListTotalCalculator(
			{charisma: 0, constitution: 0, dexterity: 0, intelligence: 2, strength: 0, wisdom: 0},
			Level.three,
		);
		expect(list.getTotal(calculator)).toBe(31);
	});

	it('should calculate total per level after first level', () => {
		const list = new PerLevelModifiersList();
		list.add(new PerLevelModifier({
			source: RoleName.arcanist,
			value: 6,
			includeFirstLevel: true,
			attributeBonuses: new Set(['intelligence']),
		}));
		list.add(new PerLevelModifier({
			source: RoleAbilityName.arcanistSpells,
			value: 1,
			includeFirstLevel: false,
		}));

		expect(list.getTotalPerLevel(Level.two)).toBe(7);
	});

	it('should calculate total per level on first level', () => {
		const list = new PerLevelModifiersList();
		list.add(new PerLevelModifier({
			source: RoleName.arcanist,
			value: 6,
			includeFirstLevel: true,
			attributeBonuses: new Set(['intelligence']),
		}));
		list.add(new PerLevelModifier({
			source: RoleAbilityName.arcanistSpells,
			value: 1,
			includeFirstLevel: false,
		}));

		expect(list.getTotalPerLevel(Level.one)).toBe(6);
	});
});
