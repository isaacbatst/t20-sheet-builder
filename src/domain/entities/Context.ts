import type {Modifier} from './ModifierOthers';

type ContextType = 'build' | 'ingame';

export abstract class Context {
	constructor(readonly type: ContextType) {}
	getModifierOthersTotal(modifiers: Modifier[]): number {
		const total = modifiers
			.reduce<number>((acc, modifier) => {
			const result = this.getContextualValue(modifier);

			return acc + result;
		}, 0);

		return total;
	}

	protected abstract getContextualValue(modifier: Modifier): number;
}
