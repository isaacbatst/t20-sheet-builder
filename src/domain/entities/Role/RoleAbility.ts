import type {AbilityEffectType} from '../Ability/Ability';
import {Ability} from '../Ability/Ability';
import type {RoleAbilityName} from './RoleAbilityName';

export type RoleAbilityInterface = Ability & {
	name: RoleAbilityName;
};

export abstract class RoleAbility extends Ability {
	constructor(
		override readonly name: RoleAbilityName,
		effectType: AbilityEffectType,
	) {
		super(name, effectType, 'role');
	}
}
