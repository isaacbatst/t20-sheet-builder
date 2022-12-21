import type {ContextInterface} from '../Context';
import type {ModifierCondition} from '../ModifierList';
import type {Translatable} from '../Translator';
import {Modifier} from './Modifier';

export class ConditionalModifier extends Modifier {
	constructor(
		source: Translatable,
		value: number,
		readonly condition: ModifierCondition,
	) {
		super(source, value);
	}

	getValue(context: ContextInterface): number {
		return context.getConditionalModifierValue(super.getValue(context), this.condition);
	}
}
