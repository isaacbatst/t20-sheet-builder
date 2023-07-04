import {AbilityEffects} from '../../Ability';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {AllihannaArmorEffect} from './AllihannaArmorEffect';

export class AllihannaArmor extends RaceAbility {
	override effects = new AbilityEffects({
		activateable: {
			default: new AllihannaArmorEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.allihannaArmor);
	}
}
