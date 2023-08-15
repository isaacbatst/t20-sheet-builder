
import {AbilityEffects} from '../../Ability';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {NoseEffect} from './NoseEffect';

export class Nose extends RaceAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new NoseEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.nose);
	}
}
