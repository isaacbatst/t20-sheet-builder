import {AbilityEffects} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {IngenuityEffect} from './IngenuityEffect';

export class Ingenuity extends RoleAbility {
	override effects = new AbilityEffects({
		triggered: {
			default: new IngenuityEffect(),
		},
	});

	constructor() {
		super(RoleAbilityName.ingenuity);
	}
}
