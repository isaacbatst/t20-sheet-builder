import {AbilityEffects} from '../../Ability';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {StreetRatEffect} from './StreetRatEffect';

export class StreetRat extends RaceAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new StreetRatEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.streetRat);
	}
}
