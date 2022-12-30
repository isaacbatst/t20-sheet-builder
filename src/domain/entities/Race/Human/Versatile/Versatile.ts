import {AbilityEffects} from '../../../Ability/AbilityEffects';
import {RaceAbility} from '../../RaceAbility';
import {RaceAbilityName} from '../../RaceAbilityName';
import type {VersatileChoice} from './VersatileChoice';
import {VersatileEffect} from './VersatileEffect';

export class Versatile extends RaceAbility {
	effects = new AbilityEffects({
		passive: {
			default: new VersatileEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.versatile);
	}

	addChoice(choice: VersatileChoice) {
		this.effects.passive.default.addChoice(choice);
	}
}
