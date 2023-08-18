import {type Attributes} from '../../Sheet';
import {Race} from '../Race';
import {type RaceAbility} from '../RaceAbility';
import {RaceName} from '../RaceName';
import {type SerializedRaces, type SerializedRace, type SerializedMinotaur} from '../SerializedRace';
import {FearOfHeights} from './FearOfHeights';
import {Hornes} from './Hornes';
import {Nose} from './Nose';
import {StiffLeather} from './StiffLeather';

export class Minotaur extends Race<SerializedMinotaur> {
	static attributeModifiers: Partial<Attributes> = {
		strength: 2,
		constitution: 1,
		wisdom: -1,
	};

	static readonly raceName = RaceName.minotaur;
	override attributeModifiers = Minotaur.attributeModifiers;

	override abilities: Record<string, RaceAbility> = {
		hornes: new Hornes(),
		stiffLeather: new StiffLeather(),
		nose: new Nose(),
		fearOfHeights: new FearOfHeights(),
	};

	constructor() {
		super(RaceName.minotaur);
	}

	override serializeSpecific(): SerializedMinotaur {
		return {
			name: Minotaur.raceName,
		};
	}
}
