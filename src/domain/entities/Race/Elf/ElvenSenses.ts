import {AbilityEffects, type AbilityEffectsInterface} from '../../Ability';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {ElvenSensesEffect} from './ElvenSensesEffect';

export class ElvenSenses extends RaceAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new ElvenSensesEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.elvenSenses);
	}
}
