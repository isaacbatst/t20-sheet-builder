import type {ContextInterface} from '../Context';
import type {ModifierInterface} from '../ModifierList';
import type {Translatable} from '../Translator';

export class Modifier implements ModifierInterface {
	constructor(
		readonly source: Translatable,
		private readonly value: number,
	) {}

	getValue(context: ContextInterface): number {
		return this.value;
	}

	getMaxPossibleValue(): number {
		return this.value;
	}
}
