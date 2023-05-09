import {AbilityEffects} from '../../../Ability/AbilityEffects';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {SpecialAttackEffect} from './SpecialAttackEffect';
export class SpecialAttack extends RoleAbility {
	effects = new AbilityEffects({
		triggered: {
			default: new SpecialAttackEffect(),
		},
	});

	constructor() {
		super(RoleAbilityName.specialAttack);
	}
}
