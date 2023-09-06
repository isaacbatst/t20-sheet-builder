import {AbilityEffects} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {PrototypeEffect, type PrototypeParams} from './PrototypeEffect';

export class Prototype extends RoleAbility {
	override effects: AbilityEffects<{
		passive: {
			default: PrototypeEffect;
		};
	}>;

	constructor(params: PrototypeParams) {
		super(RoleAbilityName.prototype);
		this.effects = new AbilityEffects({
			passive: {
				default: new PrototypeEffect(params),
			},
		});
	}
}
