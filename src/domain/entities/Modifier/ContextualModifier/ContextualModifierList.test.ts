import {InGameContextFake} from '../../Context/InGameContextFake';
import {RaceAbilityName} from '../../Race/RaceAbilityName';
import {SheetBaseFake} from '../../Sheet/SheetBaseFake';
import {ContextualModifier} from './ContextualModifier';
import {ContextualModifiersList} from './ContextualModifierList';
import {ContextualModifiersListTotalCalculator} from './ContextualModifiersListTotalCalculator';

describe('ContextualModifierList', () => {
	it('should calculate total', () => {
		const list = new ContextualModifiersList();
		list.add(new ContextualModifier(RaceAbilityName.rockKnowledge, 2, {description: 'any', verify: context => context.getCurrentLocation().isUnderground}));
		list.add(new ContextualModifier(RaceAbilityName.rockKnowledge, 2, {description: 'any', verify: context => context.getCurrentLocation().isUnderground}, new Set(['constitution'])));
		list.add(new ContextualModifier(RaceAbilityName.hardAsRock, 2, {description: 'any', verify: context => !context.getCurrentLocation().isUnderground}));

		const totalCalculator = new ContextualModifiersListTotalCalculator(
			new InGameContextFake(),
			{charisma: 0, constitution: 2, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0},
		);
		expect(list.getTotal(totalCalculator)).toBe(6);
	});

	it('should calculate max total', () => {
		const list = new ContextualModifiersList();
		list.add(new ContextualModifier(RaceAbilityName.rockKnowledge, 2, {description: 'any', verify: context => context.getCurrentLocation().isUnderground}));
		list.add(new ContextualModifier(RaceAbilityName.rockKnowledge, 2, {description: 'any', verify: context => context.getCurrentLocation().isUnderground}, new Set(['constitution'])));
		list.add(new ContextualModifier(RaceAbilityName.hardAsRock, 2, {description: 'any', verify: context => !context.getCurrentLocation().isUnderground}));
		const sheet = new SheetBaseFake();
		sheet.attributes.constitution = 2;
		expect(list.getMaxTotal(sheet.attributes)).toBe(8);
	});
});
