import {AbilityEffects} from '../../../Ability/AbilityEffects';
import {RaceAbility} from '../../RaceAbility';
import {RaceAbilityName} from '../../RaceAbilityName';
import {SlowAndAlwaysEffect} from './SlowAndAlwaysEffect';

export class SlowAndAlways extends RaceAbility {
	effects = new AbilityEffects({
		passive: {
			default: new SlowAndAlwaysEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.slowAndAlways);
	}
}
