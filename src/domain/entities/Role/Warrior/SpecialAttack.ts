import {RoleAbility} from '../RoleAbility';
import {RoleAbilityName} from '../RoleAbilityName';
import {SpecialAttackEffectPlusFour} from './SpecialAttackEffectPlusFour';

export class SpecialAttack extends RoleAbility {
	effects = {
		plusFour: new SpecialAttackEffectPlusFour(),
	};

	constructor() {
		super(RoleAbilityName.specialAttack);
	}
}
