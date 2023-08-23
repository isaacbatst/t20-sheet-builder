import {type CharacterContextAbstract} from '../../Context/CharacterContextAbstract';
import {InGameContextFake} from '../../Context/InGameContextFake';
import {RaceAbilityName} from '../../Race/RaceAbilityName';
import {type Attributes} from '../../Sheet';
import {ContextualModifier} from './ContextualModifier';
import {ContextualModifiersList} from './ContextualModifierList';
import {ContextualModifiersListTotalCalculator} from './ContextualModifiersListTotalCalculator';

const isUnderground = (context: CharacterContextAbstract) => context.getCurrentLocation()?.isUnderground ?? false;

describe('ContextualModifierList', () => {
	it('should calculate total', () => {
		const list = new ContextualModifiersList();
		list.add(new ContextualModifier({
			source: RaceAbilityName.rockKnowledge,
			value: 2,
			condition: {description: 'any', verify: isUnderground},
		}));
		list.add(new ContextualModifier({
			source: RaceAbilityName.rockKnowledge,
			value: 2,
			condition: {description: 'any', verify: isUnderground},
			attributeBonuses: new Set(['constitution']),
		}));
		list.add(new ContextualModifier({
			source: RaceAbilityName.hardAsRock,
			value: 2,
			condition: {description: 'any', verify: context => !isUnderground(context)},
		}));

		const totalCalculator = new ContextualModifiersListTotalCalculator(
			new InGameContextFake(),
			{charisma: 0, constitution: 2, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0},
		);
		const total = list.getTotal(totalCalculator);
		expect(total).toBe(6);
	});

	it('should calculate max total', () => {
		const list = new ContextualModifiersList();
		list.add(new ContextualModifier({
			source: RaceAbilityName.rockKnowledge,
			value: 2,
			condition: {description: 'any', verify: isUnderground},
		}));
		list.add(new ContextualModifier({
			source: RaceAbilityName.rockKnowledge,
			value: 2,
			condition: {description: 'any', verify: isUnderground},
			attributeBonuses: new Set(['constitution']),
		}));
		list.add(new ContextualModifier({
			source: RaceAbilityName.hardAsRock,
			value: 2,
			condition: {description: 'any', verify: context => !isUnderground(context)},
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
