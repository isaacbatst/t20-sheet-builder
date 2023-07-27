import {AbilityEffects} from '../../Ability/AbilityEffects';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import {SlenderPlageEffect} from './SlenderPlageEffect';

export class SlenderPlage extends RaceAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new SlenderPlageEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.slenderPlage);
	}
}
