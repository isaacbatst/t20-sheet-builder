import {Level} from '../../../Levels';
import type {EffectExecution, SheetInterface} from '../../../Sheet/SheetInterface';
import type {SpecialAttackEffectExecutionRecipient} from './SpecialAttackEffectExecutionRecipient';
import type {SpecialAttackManaCost} from './SpecialAttackManaCost';
import {SpecialAttackEffect} from './SpecialAttackEffect';

export class SpecialAttackEffectExecution implements EffectExecution {
	readonly maxModifier: number;

	constructor(
		readonly recipient: SpecialAttackEffectExecutionRecipient,
		cost: SpecialAttackManaCost,
		level: Level,
	) {
		this.validateCost(cost, level);
		this.maxModifier = SpecialAttackEffect.maxModifier[cost.value];
	}

	execute(sheet: SheetInterface): void {
		this.recipient.applyModifier(this.maxModifier, sheet);
	}

	private validateCost(cost: SpecialAttackManaCost,	sheetLevel: Level) {
		const levels = Object.values(Level);
		const sheetLevelIndex = levels.findIndex(level => level === sheetLevel);
		const minLevel = SpecialAttackEffect.minLevelToCost[cost.value];
		const minLevelIndex = levels.findIndex(level => level === minLevel);

		if (sheetLevelIndex < minLevelIndex) {
			throw new Error('FORBIDDEN_COST_FOR_LEVEL');
		}
	}
}
