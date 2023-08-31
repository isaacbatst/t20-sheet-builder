import {AbilityEffects} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {BulwarkEffect} from './BulwarkEffect';

export class Bulwark extends RoleAbility {
	override effects = new AbilityEffects({
		triggered: {
			default: new BulwarkEffect(),
		},
	});

	constructor() {
		super(RoleAbilityName.bulwark);
	}
}
