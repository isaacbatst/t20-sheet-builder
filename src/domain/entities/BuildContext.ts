import {Context} from './Context';
import type {Modifier} from './ModifierOthers';

export class BuildContext extends Context {
	constructor() {
		super('build');
	}

	protected getContextualValue(modifier: Modifier): number {
		return modifier.condition ? 0 : modifier.value;
	}
}
