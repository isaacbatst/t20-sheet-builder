import {AbilityEffects, type AbilityEffectsInterface} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';

export class LightningStrike extends RoleAbility {
	override effects: AbilityEffectsInterface = new AbilityEffects({});
	constructor() {
		super(RoleAbilityName.lightningStrike);
	}
}
