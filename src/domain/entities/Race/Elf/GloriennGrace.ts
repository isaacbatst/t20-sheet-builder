import {AbilityEffects} from '../../Ability';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {GloriennGraceEffect} from './GloriennGraceEffect';

export class GloriennGrace extends RaceAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new GloriennGraceEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.gloriennGrace);
	}
}
