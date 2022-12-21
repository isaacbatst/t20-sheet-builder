import type {Attributes} from '../Attributes';
import {HardAsRock} from '../RaceAbility/Dwarf/HardAsRock';
import {RockKnowledge} from '../RaceAbility/Dwarf/RockKnowledge';
import {SlowAndAlways} from '../RaceAbility/Dwarf/SlowAndAlways';
import type {RaceAbility} from '../RaceAbility/RaceAbility';
import {Race} from './Race';
import {RaceName} from './RaceName';

export class Dwarf extends Race {
	readonly abilities: Record<string, RaceAbility> = {
		rockKnowledge: new RockKnowledge(),
		slowAndAlways: new SlowAndAlways(),
		hardAsRock: new HardAsRock(),
	};

	readonly attributeModifiers: Partial<Attributes> = {
		dexterity: -1,
		constitution: 2,
		wisdom: 1,
	};

	constructor() {
		super(RaceName.dwarf);
	}
}
