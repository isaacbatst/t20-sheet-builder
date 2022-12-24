import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {SlowAndAlwaysEffect} from './SlowAndAlwaysEffect';

export class SlowAndAlways extends RaceAbility {
	effects = {
		default: new SlowAndAlwaysEffect(),
	};

	constructor() {
		super(RaceAbilityName.slowAndAlways);
	}
}
