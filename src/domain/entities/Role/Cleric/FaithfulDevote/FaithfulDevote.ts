import {AbilityEffects} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {FaithfulDevoteEffect} from './FaithfulDevoteEffect';

export class FaithfulDevote extends RoleAbility {
	override effects: AbilityEffects<{
		passive: {
			default: FaithfulDevoteEffect;
		};
	}>;

	constructor(role: 'cleric' | 'druid') {
		const name = role === 'cleric'
			? RoleAbilityName.clericFaithfulDevote
			: RoleAbilityName.druidFaithfulDevote;
		super(name);
		this.effects = new AbilityEffects({
			passive: {
				default: new FaithfulDevoteEffect(role, name),
			},
		});
	}
}
