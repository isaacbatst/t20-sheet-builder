import {AbilityEffects, type AbilityEffectsInterface} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {BlessedPassiveEffect} from './BlessedPassiveEffect';

export class Blessed extends RoleAbility {
	override effects: AbilityEffectsInterface = new AbilityEffects({
		passive: {
			default: new BlessedPassiveEffect(),
		},
	});

	constructor() {
		super(RoleAbilityName.blessed);
	}
}
