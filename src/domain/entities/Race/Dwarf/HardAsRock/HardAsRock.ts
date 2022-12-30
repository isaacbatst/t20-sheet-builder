import {AbilityEffects} from '../../../Ability/AbilityEffects';
import {RaceAbility} from '../../RaceAbility';
import {RaceAbilityName} from '../../RaceAbilityName';
import {HardAsRockInitialEffect} from './HardAsRockInitialEffect';
import {HardAsRockPerLevelEffect} from './HardAsRockPerLevelEffect';

export class HardAsRock extends RaceAbility {
	effects = new AbilityEffects({
		passive: {
			initial: new HardAsRockInitialEffect(),
			perLevel: new HardAsRockPerLevelEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.hardAsRock);
	}
}
