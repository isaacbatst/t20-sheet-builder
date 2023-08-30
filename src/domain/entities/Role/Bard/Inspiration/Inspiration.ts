import {AbilityEffects} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {InspirationEffect} from './InspirationEffect';

export class Inspiration extends RoleAbility {
	override effects = new AbilityEffects({
		activateable: {
			default: new InspirationEffect(),
		},
	});

	constructor() {
		super(RoleAbilityName.inspiration);
	}
}
