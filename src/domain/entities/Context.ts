import type {ModifierCondition} from './ModifierList';

export type ContextType = 'outgame' | 'ingame';

export type ContextInterface = {
	type: ContextType;
	getConditionalModifierValue(value: number, condition: ModifierCondition): number;
};

export abstract class Context implements ContextInterface {
	constructor(readonly type: ContextType) {}
	abstract getConditionalModifierValue(value: number, condition: ModifierCondition): number;
}
