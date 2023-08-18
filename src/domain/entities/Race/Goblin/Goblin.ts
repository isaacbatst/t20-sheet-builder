import {type Attributes} from '../../Sheet';
import {Race} from '../Race';
import {type RaceAbility} from '../RaceAbility';
import {RaceName} from '../RaceName';
import {type SerializedGoblin} from '../SerializedRace';
import {Ingenious} from './Ingenious';
import {Jointer} from './Jointer';
import {SlenderPlage} from './SlenderPlage';
import {StreetRat} from './StreetRat';

export class Goblin extends Race<SerializedGoblin> {
	static readonly raceName = RaceName.goblin;
	static attributeModifiers: Partial<Attributes> = {
		charisma: -1,
		dexterity: 2,
		intelligence: 1,
	};

	static abilities: Record<string, RaceAbility> = {
		ingenious: new Ingenious(),
		jointer: new Jointer(),
		slenderPlage: new SlenderPlage(),
		streetRat: new StreetRat(),
	};

	override attributeModifiers: Partial<Attributes> = Goblin.attributeModifiers;
	override abilities: Record<string, RaceAbility> = Goblin.abilities;

	constructor() {
		super(RaceName.goblin);
	}

	override serializeSpecific(): SerializedGoblin {
		return {
			name: Goblin.raceName,
		};
	}
}
