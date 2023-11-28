import {AbilityEffects, type AbilityEffectsInterface} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {FightEffect} from './FightEffect';

export class Fight extends RoleAbility {
	override effects: AbilityEffectsInterface = new AbilityEffects({
		roleplay: {
			default: new FightEffect(),
		},
	});

	constructor() {
		super(RoleAbilityName.fight);
	}
}
