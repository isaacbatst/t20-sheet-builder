import {AbilityEffects} from '../../../Ability';
import {RaceAbility} from '../../RaceAbility';
import {RaceAbilityName} from '../../RaceAbilityName';
import {SonOfTormentaEffect} from './SonOfTormentaEffect';

export class SonOfTormenta extends RaceAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new SonOfTormentaEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.sonOfTormenta);
	}
}
