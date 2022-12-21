import {BuildContext} from './BuildContext';
import type {Context} from './Context';
import type {InGameContext} from './InGameContext';
import type {Translatable} from './Translator';

export type ConditionVerify = (context: InGameContext) => boolean;

export type ModifierCondition = {
	description: string;
	verify: ConditionVerify;
};

export type Modifier = {
	condition?: ModifierCondition;
	source: Translatable;
	value: number;
};

export class ModifierOthers {
	readonly modifiers: Modifier[] = [];
	constructor(private readonly modifierRepeatedError: string) {}

	getTotal(context: Context = new BuildContext()) {
		return context.getModifierOthersTotal(this.modifiers);
	}

	add(newModifier: Modifier) {
		const isRepeated = this.modifiers.some(otherModifier => otherModifier.source === newModifier.source);

		if (isRepeated) {
			throw new Error(this.modifierRepeatedError);
		}

		this.modifiers.push(newModifier);
	}
}
