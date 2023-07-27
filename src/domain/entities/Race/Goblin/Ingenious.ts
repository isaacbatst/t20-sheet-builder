import {AbilityEffects} from '../../Ability';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {IngeniousEffect} from './IngeniousEffect';

export class Ingenious extends RaceAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new IngeniousEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.ingenious);
	}
}
