import {TriggeredEffect} from '../../../Ability/TriggeredEffect';
import type {TriggeredEffectName} from '../../../Ability/TriggeredEffectName';
import {Level} from '../../../Sheet/Levels';
import {ManaCost} from '../../../ManaCost';
import {RoleAbilityName} from '../../RoleAbilityName';
import {SpecialAttackManaCost} from './SpecialAttackManaCost';
import {SpecialAttackEffectCosts} from './SpecialAttackManaCost';

export abstract class SpecialAttackEffect extends TriggeredEffect {
	static minLevelToCost: Record<SpecialAttackEffectCosts, Level> = {
		[SpecialAttackEffectCosts.oneManaPoint]: Level.levelOne,
		[SpecialAttackEffectCosts.twoManaPoints]: Level.levelFive,
	};

	static costs: Record<SpecialAttackEffectCosts, ManaCost> = {
		[SpecialAttackEffectCosts.oneManaPoint]: new ManaCost(1),
		[SpecialAttackEffectCosts.twoManaPoints]: new ManaCost(2),
	};

	static maxModifier: Record<SpecialAttackEffectCosts, number> = {
		[SpecialAttackEffectCosts.oneManaPoint]: 4,
		[SpecialAttackEffectCosts.twoManaPoints]: 8,
	};

	costs: SpecialAttackManaCost[];

	constructor(
		cost: SpecialAttackEffectCosts,
		name: TriggeredEffectName,
	) {
		super({
			duration: 'next',
			execution: 'reaction',
			source: RoleAbilityName.specialAttack,
			triggerEvent: 'attack',
			name,
		});
		this.costs = [new SpecialAttackManaCost(cost)];
	}
}
