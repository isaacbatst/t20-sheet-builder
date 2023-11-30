import {AbilityEffects, type AbilityEffectsInterface} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {DivineBlowEffect} from './DivineBlowEffect';

export class DivineBlow extends RoleAbility {
	override effects: AbilityEffectsInterface = new AbilityEffects({
		triggered: {
			default: new DivineBlowEffect(),
		},
	});

	constructor() {
		super(RoleAbilityName.divineBlow);
	}
}
