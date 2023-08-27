import {TriggerEvent, TriggeredEffect} from '../../../Ability/TriggeredEffect';
import {TriggeredEffectName} from '../../../Ability/TriggeredEffectName';
import {ManaCost} from '../../../ManaCost';
import {Level} from '../../../Sheet/Level';
import {RoleAbilityName} from '../../RoleAbilityName';
import {SpecialAttackEffectCosts} from './SpecialAttackManaCost';

export class SpecialAttackEffect extends TriggeredEffect {
	get description() {
		return 'Quando faz um ataque, você pode gastar 1 PM para receber +4 no teste de ataque ou na rolagem de dano. '
		+ 'A cada quatro níveis, pode gastar +1 PM para aumentar o bônus em +4. Você pode dividir os bônus igualmente.';
	}

	static minLevelToCost: Record<SpecialAttackEffectCosts, Level> = {
		[SpecialAttackEffectCosts.oneManaPoint]: Level.one,
		[SpecialAttackEffectCosts.twoManaPoints]: Level.five,
	};

	static costs: Record<SpecialAttackEffectCosts, ManaCost> = {
		[SpecialAttackEffectCosts.oneManaPoint]: new ManaCost(1),
		[SpecialAttackEffectCosts.twoManaPoints]: new ManaCost(2),
	};

	static maxModifier: Record<SpecialAttackEffectCosts, number> = {
		[SpecialAttackEffectCosts.oneManaPoint]: 4,
		[SpecialAttackEffectCosts.twoManaPoints]: 8,
	};

	baseCosts: ManaCost[];

	constructor() {
		super({
			duration: 'next',
			execution: 'reaction',
			source: RoleAbilityName.specialAttack,
			triggerEvent: TriggerEvent.attack,
			name: TriggeredEffectName.specialAttack,
		});
		this.baseCosts = [new ManaCost(1)];
	}
}
