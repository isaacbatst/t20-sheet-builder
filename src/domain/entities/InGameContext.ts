import {Context} from './Context';
import type {ModifierCondition} from './ModifierList';
import type {Location} from './SheetInterface';

export class InGameContext extends Context {
	private readonly location: Location;

	constructor(initialLocation: Location) {
		super('ingame');
		this.location = initialLocation;
	}

	getConditionalModifierValue(value: number, condition: ModifierCondition): number {
		if (condition.verify(this)) {
			return value;
		}

		return 0;
	}

	getCurrentLocation(): Location {
		return this.location;
	}
}
