import {AbilityEffects} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {FaithfulDevoteEffect} from './FaithfulDevoteEffect';

export class FaithfulDevote extends RoleAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new FaithfulDevoteEffect(),
		},
	});

	constructor() {
		super(RoleAbilityName.faithfulDevote);
	}
}
