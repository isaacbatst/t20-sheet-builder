import {AbilityEffects} from '../../Ability';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {JointerEffect} from './JointerEffect';

export class Jointer extends RaceAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new JointerEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.jointer);
	}
}
