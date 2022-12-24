import {Level} from '../../Levels';
import {ManaCost} from '../../ManaCost';
import type {EffectExecution, SheetInterface} from '../../SheetInterface';
import type {SpecialAttackEffectExecutionRecipient} from './SpecialAttackEffectExecutionRecipient';
import type {SpecialAttackManaCost} from './SpecialAttackManaCost';
import {SpecialAttackEffectCosts} from './SpecialAttackManaCost';

export class SpecialAttackEffectExecution implements EffectExecution {
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

	readonly maxModifier: number;

	constructor(
		readonly recipient: SpecialAttackEffectExecutionRecipient,
		cost: SpecialAttackManaCost,
		level: Level,
	) {
		this.validateCost(cost, level);
		this.maxModifier = SpecialAttackEffectExecution.maxModifier[cost.value];
	}

	execute(sheet: SheetInterface): void {
		this.recipient.applyModifier(this.maxModifier, sheet);
	}

	private validateCost(cost: SpecialAttackManaCost,	sheetLevel: Level) {
		const levels = Object.values(Level);
		const sheetLevelIndex = levels.findIndex(level => level === sheetLevel);
		const minLevel = SpecialAttackEffectExecution.minLevelToCost[cost.value];
		const minLevelIndex = levels.findIndex(level => level === minLevel);

		if (sheetLevelIndex < minLevelIndex) {
			throw new Error('FORBIDDEN_COST_FOR_LEVEL');
		}
	}
}
