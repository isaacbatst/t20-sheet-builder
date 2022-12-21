import {Context} from './Context';

export class BuildingSheetContext extends Context {
	constructor() {
		super('build');
	}

	getConditionalModifierValue() {
		return 0;
	}
}
