import {AbilityEffects, RolePlayEffect, type AbilityEffectsInterface} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';

export class SelfConfidence extends RoleAbility {
	static readonly description = 'Você pode usar seu Carisma'
  + ' em vez de Destreza na Defesa (mas continua não podendo'
  + ' somar um atributo na Defesa quando usa armadura pesada).';

	override effects: AbilityEffectsInterface = new AbilityEffects({
		roleplay: {
			default: new RolePlayEffect(RoleAbilityName.selfConfidence, SelfConfidence.description),
		},
	});

	constructor() {
		super(RoleAbilityName.selfConfidence);
	}
}
