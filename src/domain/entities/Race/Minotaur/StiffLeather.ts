
import {AbilityEffects} from '../../Ability';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {StiffLeatherEffect} from './StiffLeatherEffect';

export class StiffLeather extends RaceAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new StiffLeatherEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.stiffLeather);
	}
}
