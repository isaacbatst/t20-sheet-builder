import {AbilityEffects, type AbilityEffectsInterface} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';

export class DivineBlow extends RoleAbility {
	override effects: AbilityEffectsInterface = new AbilityEffects();

	constructor() {
		super(RoleAbilityName.divineBlow);
	}
}
