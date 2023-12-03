import {AbilityEffects, RolePlayEffect, type AbilityEffectsInterface} from '../../../Ability';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';

export class HeroCode extends RoleAbility {
	static description: string = 'Você deve sempre manter'
	+ ' sua palavra e nunca pode recusar um pedido de'
	+ ' ajuda de alguém inocente. Além disso, nunca pode'
	+ ' mentir, trapacear ou roubar. Se violar o código, você'
	+ ' perde todos os seus PM e só pode recuperá-los a'
	+ ' partir do próximo dia.';

	override effects: AbilityEffectsInterface = new AbilityEffects({
		roleplay: {
			default: new RolePlayEffect(RoleAbilityName.heroCode, HeroCode.description),
		},
	});

	constructor() {
		super(RoleAbilityName.heroCode);
	}
}
