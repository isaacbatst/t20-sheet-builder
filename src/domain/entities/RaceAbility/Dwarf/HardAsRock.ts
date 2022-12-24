import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {HardAsRockInitialEffect} from './HardAsRockInitialEffect';
import {HardAsRockPerLevelEffect} from './HardAsRockPerLevelEffect';

export class HardAsRock extends RaceAbility {
	effects = {
		initial: new HardAsRockInitialEffect(),
		perLevel: new HardAsRockPerLevelEffect(),
	};

	constructor() {
		super(RaceAbilityName.hardAsRock);
	}
}
