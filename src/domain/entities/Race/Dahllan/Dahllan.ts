import {WildEmpathy} from '../../Ability/common/WildEmpathy';
import {type Attributes} from '../../Sheet';
import {Race} from '../Race';
import {type RaceAbility} from '../RaceAbility';
import {RaceName} from '../RaceName';
import {type SerializedDahllan} from '../SerializedRace';
import {AllihannaArmor} from './AllihannaArmor';
import {PlantsFriend} from './PlantsFriend';

export class Dahllan extends Race {
	static attributeModifiers: Partial<Attributes> = {
		wisdom: 2,
		dexterity: 1,
		intelligence: -1,
	};

	static readonly raceName = RaceName.dahllan;

	override attributeModifiers = Dahllan.attributeModifiers;
	override abilities: Record<string, RaceAbility> = {
		plantsFriend: new PlantsFriend(),
		allihannaArmor: new AllihannaArmor(),
		wildEmpathy: new WildEmpathy(),
	};

	constructor() {
		super(Dahllan.raceName);
	}

	override serialize(): SerializedDahllan {
		return {
			name: Dahllan.raceName,
		};
	}
}
