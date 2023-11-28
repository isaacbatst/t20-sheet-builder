import {AbilityEffects, RolePlayEffect, type AbilityEffectsInterface} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';

export class Asset extends RoleAbility {
	static readonly description = 'Você recebe um item a sua escolha'
  + ' com preço de até T$ 2.000.';

	override effects: AbilityEffectsInterface = new AbilityEffects({
		roleplay: {
			default: new RolePlayEffect(RoleAbilityName.asset, Asset.description),
		},
	});

	constructor() {
		super(RoleAbilityName.asset);
	}
}
