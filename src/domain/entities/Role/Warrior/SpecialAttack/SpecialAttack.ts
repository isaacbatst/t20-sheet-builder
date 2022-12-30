import {AbilityEffects} from '../../../Ability/AbilityEffects';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {SpecialAttackEffectPlusFour} from './SpecialAttackEffectPlusFour';

export class SpecialAttack extends RoleAbility {
	effects = new AbilityEffects({
		triggered: {
			plusFour: new SpecialAttackEffectPlusFour(),
		},
	});

	constructor() {
		super(RoleAbilityName.specialAttack);
	}
}
