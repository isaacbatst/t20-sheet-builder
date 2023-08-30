import {AbilityEffects} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {PreyMarkEffect} from './PreyMarkEffect';

export class PreyMark extends RoleAbility {
	override effects = new AbilityEffects({
		activateable: {
			default: new PreyMarkEffect(),
		},
	});

	constructor() {
		super(RoleAbilityName.preyMark);
	}
}
