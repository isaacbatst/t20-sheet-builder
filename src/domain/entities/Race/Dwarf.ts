import type {Ability} from '../Ability';
import {RockKnowledge} from '../RaceAbility/Dwarf/RockKnowledge';
import type {AttributeModifier} from './Race';
import {Race} from './Race';
import {RaceNameEnum} from './RaceName';

export class Dwarf extends Race {
	readonly abilities: Record<string, Ability> = {
		rockKnowledge: new RockKnowledge(),
	};

	readonly attributeModifiers: AttributeModifier[] = [
		{attribute: 'dexterity', modifier: -1},
		{attribute: 'constitution', modifier: 2},
		{attribute: 'wisdom', modifier: 1},
	];

	constructor() {
		super(RaceNameEnum.dwarf);
	}
}
