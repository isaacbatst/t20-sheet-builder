import type {Attributes} from '../../Sheet/Attributes';
import {HardAsRock} from './HardAsRock/HardAsRock';
import {RockKnowledge} from './RockKnowledge/RockKnowledge';
import {SlowAndAlways} from './SlowAndAlways/SlowAndAlways';
import type {RaceAbility} from '../RaceAbility';
import {Race} from '../Race';
import {RaceName} from '../RaceName';
import type {RaceStatic} from '../RaceStatic';

export class Dwarf extends Race {
	static attributeModifiers: Partial<Attributes> = {
		dexterity: -1,
		constitution: 2,
		wisdom: 1,
	};

	readonly abilities: Record<string, RaceAbility> = {
		rockKnowledge: new RockKnowledge(),
		slowAndAlways: new SlowAndAlways(),
		hardAsRock: new HardAsRock(),
	};

	readonly attributeModifiers = Dwarf.attributeModifiers;

	constructor() {
		super(RaceName.dwarf);
	}
}
