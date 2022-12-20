import {BuildContext} from './BuildContext';
import type {Context} from './Context';
import type {InGameContext} from './InGameContext';

export type Modifier = {
	condition?: (context: InGameContext) => boolean;
	sourceName: string;
	value: number;
};

export class ModifierOthers {
	readonly modifiers: Modifier[] = [];
	constructor(private readonly modifierRepeatedError: string) {}

	getTotal(context: Context = new BuildContext()) {
		return context.getModifierOthersTotal(this.modifiers);
	}

	add(newModifier: Modifier) {
		const isRepeated = this.modifiers.some(otherModifier => otherModifier.sourceName === newModifier.sourceName);

		if (isRepeated) {
			throw new Error(this.modifierRepeatedError);
		}

		this.modifiers.push(newModifier);
	}
}
