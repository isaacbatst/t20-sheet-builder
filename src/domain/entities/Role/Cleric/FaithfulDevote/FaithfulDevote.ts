import {AbilityEffects} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {FaithfulDevoteEffect} from './FaithfulDevoteEffect';

export class FaithfulDevote extends RoleAbility {
	static readonly abilityName = {
		cleric: RoleAbilityName.clericFaithfulDevote,
		druid: RoleAbilityName.druidFaithfulDevote,
	} as const

	override effects: AbilityEffects<{
		passive: {
			default: FaithfulDevoteEffect;
		};
	}>;

	constructor(role: 'cleric' | 'druid') {
		const name = FaithfulDevote.abilityName[role];
		super(name);
		this.effects = new AbilityEffects({
			passive: {
				default: new FaithfulDevoteEffect(role, name),
			},
		});
	}
}
