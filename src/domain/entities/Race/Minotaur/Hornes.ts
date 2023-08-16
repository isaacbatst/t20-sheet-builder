import {AbilityEffects} from '../../Ability';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {HornesEffect} from './HornesEffect';

export class Hornes extends RaceAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new HornesEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.hornes);
	}
}
