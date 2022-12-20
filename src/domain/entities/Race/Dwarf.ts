import type {Ability} from '../Ability';
import {RockKnowledge} from '../RaceAbility/Dwarf/RockKnowledge';
import type {AttributeModifier} from './Race';
import {Race} from './Race';
import {RaceNameEnum} from './RaceName';

export class Dwarf extends Race {
	readonly abilities: Record<string, Ability> = {
		rockKnowledge: new RockKnowledge(),
	};

	readonly modifiers: AttributeModifier[] = [
		{attribute: 'dexterity', value: -1},
		{attribute: 'constitution', value: 2},
		{attribute: 'wisdom', value: 1},
	];

	constructor() {
		super(RaceNameEnum.dwarf);
	}
}