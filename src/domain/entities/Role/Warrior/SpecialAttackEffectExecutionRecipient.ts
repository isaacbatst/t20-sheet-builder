import type {SheetInterface} from '../../SheetInterface';

export type SpecialAttackEffectExecutionRecipientType = 'damage' | 'attack' | 'both';
export abstract class SpecialAttackEffectExecutionRecipient {
	abstract type: SpecialAttackEffectExecutionRecipientType;
	abstract applyModifier(maxModifier: number, sheet: SheetInterface): void;
}
