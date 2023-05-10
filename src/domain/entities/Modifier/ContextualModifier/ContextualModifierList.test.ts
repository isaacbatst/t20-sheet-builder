import {InGameContextFake} from '../../Context/InGameContextFake';
import {RaceAbilityName} from '../../Race/RaceAbilityName';
import {type Attributes} from '../../Sheet';
import {ContextualModifier} from './ContextualModifier';
import {ContextualModifiersList} from './ContextualModifierList';
import {ContextualModifiersListTotalCalculator} from './ContextualModifiersListTotalCalculator';

describe('ContextualModifierList', () => {
	it('should calculate total', () => {
		const list = new ContextualModifiersList();
		list.add(new ContextualModifier({
			source: RaceAbilityName.rockKnowledge,
			value: 2,
			condition: {description: 'any', verify: context => context.getCurrentLocation().isUnderground},
		}));
		list.add(new ContextualModifier({
			source: RaceAbilityName.rockKnowledge,
			value: 2,
			condition: {description: 'any', verify: context => context.getCurrentLocation().isUnderground},
			incrementerAttributes: new Set(['constitution']),
		}));
		list.add(new ContextualModifier({
			source: RaceAbilityName.hardAsRock,
			value: 2,
			condition: {description: 'any', verify: context => !context.getCurrentLocation().isUnderground},
		}));

		const totalCalculator = new ContextualModifiersListTotalCalculator(
			new InGameContextFake(),
			{charisma: 0, constitution: 2, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0},
		);
		expect(list.getTotal(totalCalculator)).toBe(6);
	});

	it('should calculate max total', () => {
		const list = new ContextualModifiersList();
		list.add(new ContextualModifier({
			source: RaceAbilityName.rockKnowledge,
			value: 2,
			condition: {description: 'any', verify: context => context.getCurrentLocation().isUnderground},
		}));
		list.add(new ContextualModifier({
			source: RaceAbilityName.rockKnowledge,
			value: 2,
			condition: {description: 'any', verify: context => context.getCurrentLocation().isUnderground},
			incrementerAttributes: new Set(['constitution']),
		}));
		list.add(new ContextualModifier({
			source: RaceAbilityName.hardAsRock,
			value: 2,
			condition: {description: 'any', verify: context => !context.getCurrentLocation().isUnderground},
		}));
		const attributes: Attributes = {
			charisma: 0,
			constitution: 2,
			dexterity: 0,
			intelligence: 0,
			strength: 0,
			wisdom: 0,
		};
		expect(list.getMaxTotal(attributes)).toBe(8);
	});
});
