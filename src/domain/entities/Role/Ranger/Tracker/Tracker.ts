import {AbilityEffects} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {TrackerEffect} from './TrackerEffect';

export class Tracker extends RoleAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new TrackerEffect(),
		},
	});

	constructor() {
		super(RoleAbilityName.tracker);
	}
}
