import {AbilityEffects, RolePlayEffect, type AbilityEffectsInterface} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';

export class SneakAttack extends RoleAbility {
	static readonly description = 'Você sabe atingir os pontos'
	+ ' vitais de inimigos distraídos. Uma vez por rodada,'
	+ ' quando atinge uma criatura desprevenida com um'
	+ ' ataque corpo a corpo ou em alcance curto, ou uma'
	+ ' criatura que esteja flanqueando, você causa 1d6 pon-'
	+ ' tos de dano extra. A cada dois níveis, esse dano extra'
	+ ' aumenta em +1d6. Uma criatura imune a acertos'
	+ ' críticos também é imune a ataques furtivos.';

	override effects: AbilityEffectsInterface = new AbilityEffects({
		roleplay: {
			default: new RolePlayEffect(RoleAbilityName.sneakAttack, SneakAttack.description),
		},
	});

	constructor() {
		super(RoleAbilityName.sneakAttack);
	}
}
