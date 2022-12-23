import {RoleAbility} from '../RoleAbility';
import {RoleAbilityName} from '../RoleAbilityName';

export class SpecialAttack extends RoleAbility {
	constructor() {
		super(RoleAbilityName.specialAttack, 'active');
	}
}
