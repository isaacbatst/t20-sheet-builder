import {AbilityEffects} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {RageEffect} from './RageEffect';

export class Rage extends RoleAbility {
	override effects = new AbilityEffects({
		activateable: {
			default: new RageEffect(),
		},
	});

	constructor() {
		super(RoleAbilityName.rage);
	}
}
