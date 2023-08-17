import {type Attributes} from '../../Sheet';
import {Race} from '../Race';
import {type RaceAbility} from '../RaceAbility';
import {RaceName} from '../RaceName';
import {ElvenSenses} from './ElvenSenses';
import {GloriennGrace} from './GloriennGrace';
import {MagicBlood} from './MagicBlood';

export class Elf extends Race {
	static attributeModifiers: Partial<Attributes> = {
		intelligence: 2,
		dexterity: 1,
		constitution: -1,
	};

	static readonly raceName = RaceName.elf;
	override attributeModifiers = Elf.attributeModifiers;

	override abilities: Record<string, RaceAbility> = {
		gloriennGrace: new GloriennGrace(),
		magicBlood: new MagicBlood(),
		elvenSenses: new ElvenSenses(),
	};

	constructor() {
		super(RaceName.elf);
	}
}
