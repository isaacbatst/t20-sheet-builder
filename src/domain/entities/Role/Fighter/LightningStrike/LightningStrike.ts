import {AbilityEffects, type AbilityEffectsInterface} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {LightningStrikeEffect} from './LightningStrikeEffect';

export class LightningStrike extends RoleAbility {
	override effects: AbilityEffectsInterface = new AbilityEffects({
		roleplay: {
			default: new LightningStrikeEffect(),
		},
	});

	constructor() {
		super(RoleAbilityName.lightningStrike);
	}
}
