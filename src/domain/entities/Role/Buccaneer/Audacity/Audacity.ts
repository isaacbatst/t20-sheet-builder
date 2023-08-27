import {AbilityEffects} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {AudacityEffect} from './AudacityEffect';

export class Audacity extends RoleAbility {
	override effects = new AbilityEffects({
		triggered: {
			default: new AudacityEffect(),
		},
	});

	constructor() {
		super(RoleAbilityName.audacity);
	}
}
