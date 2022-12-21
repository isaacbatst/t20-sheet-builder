import {BuildingSheetContext} from './BuildingSheetContext';
import type {ContextInterface} from './Context';
import type {ModifierInterface} from './ModifierList';
import {ModifiersList} from './ModifierList';
import {GeneralPowerNameEnum} from './Power/GeneralPowerName';
import {RaceAbilityName} from './RaceAbility/RaceAbilityName';

describe('ModifierOthers', () => {
	it('should throw error with repeated modifier source', () => {
		const others = new ModifiersList('OTHER_MODIFIER_REPEATED_ERROR');
		const modifier = {source: GeneralPowerNameEnum.dodge, getValue: () => 2, getMaxPossibleValue: () => 2};
		others.add(modifier);

		expect(() => {
			others.add(modifier);
		}).toThrow('OTHER_MODIFIER_REPEATED_ERROR');
	});

	it('should calculate total', () => {
		const others = new ModifiersList('OTHER_MODIFIER_REPEATED_ERROR');

		const dodgeModifier: ModifierInterface = {source: GeneralPowerNameEnum.dodge, getMaxPossibleValue: () => 2, getValue: () => 0};
		const rockKnowledgeModifier: ModifierInterface = {source: RaceAbilityName.rockKnowledge, getMaxPossibleValue: () => 2, getValue: () => 2};

		others.add(dodgeModifier);
		others.add(rockKnowledgeModifier);

		const fakeContext: ContextInterface = {type: 'build', getConditionalModifierValue: jest.fn()};

		const total = others.getTotal(fakeContext);

		expect(total).toBe(2);
	});

	it('should calculate max possible total', () => {
		const others = new ModifiersList('OTHER_MODIFIER_REPEATED_ERROR');

		const dodgeModifier: ModifierInterface = {source: GeneralPowerNameEnum.dodge, getMaxPossibleValue: () => 2, getValue: () => 0};
		const rockKnowledgeModifier: ModifierInterface = {source: RaceAbilityName.rockKnowledge, getMaxPossibleValue: () => 2, getValue: () => 2};

		others.add(dodgeModifier);
		others.add(rockKnowledgeModifier);

		const total = others.getMaxPossibleTotal();

		expect(total).toBe(4);
	});
});
