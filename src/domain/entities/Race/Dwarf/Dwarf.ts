import type {Attributes} from '../../Sheet/Attributes';
import {Race} from '../Race';
import type {RaceAbility} from '../RaceAbility';
import {RaceName} from '../RaceName';
import {HardAsRock} from './HardAsRock/HardAsRock';
import {HeredrimmTradition} from './HeredrimmTradition/HeredrimmTradition';
import {RockKnowledge} from './RockKnowledge/RockKnowledge';
import {SlowAndAlways} from './SlowAndAlways/SlowAndAlways';

export class Dwarf extends Race {
	static raceName = RaceName.dwarf;

	static attributeModifiers: Partial<Attributes> = {
		dexterity: -1,
		constitution: 2,
		wisdom: 1,
	};

	readonly abilities: Record<string, RaceAbility> = {
		rockKnowledge: new RockKnowledge(),
		slowAndAlways: new SlowAndAlways(),
		hardAsRock: new HardAsRock(),
		heredrimmTradition: new HeredrimmTradition(),
	};

	readonly attributeModifiers = Dwarf.attributeModifiers;

	constructor() {
		super(RaceName.dwarf);
	}
}
