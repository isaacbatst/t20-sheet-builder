import {BuildingSheetContext} from './BuildingSheetContext';
import type {ContextInterface} from './Context';
import {ModifierOthers} from './ModifierOthers';
import {GeneralPowerNameEnum} from './Power/GeneralPowerName';
import {RaceAbilityName} from './RaceAbility/RaceAbilityName';

describe('ModifierOthers', () => {
	it('should throw error with repeated modifier source', () => {
		const others = new ModifierOthers('OTHER_MODIFIER_REPEATED_ERROR');

		others.add({source: GeneralPowerNameEnum.dodge, value: 2});

		expect(() => {
			others.add({source: GeneralPowerNameEnum.dodge, value: 2});
		}).toThrow('OTHER_MODIFIER_REPEATED_ERROR');
	});

	it('should call context calculate total', () => {
		const others = new ModifierOthers('OTHER_MODIFIER_REPEATED_ERROR');

		const dodgeModifier = {source: GeneralPowerNameEnum.dodge, value: 2};
		const rockKnowledgeModifier = {source: RaceAbilityName.rockKnowledge, value: 2};

		others.add(dodgeModifier);
		others.add(rockKnowledgeModifier);

		const fakeContext: ContextInterface = {type: 'build', getModifierOthersTotal: jest.fn()};

		others.getTotal(fakeContext);

		expect(fakeContext.getModifierOthersTotal).toHaveBeenCalledWith([dodgeModifier, rockKnowledgeModifier]);
	});
});
