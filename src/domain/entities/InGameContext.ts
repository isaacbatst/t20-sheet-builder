import type {Location} from './CharacterInterface';
import {Context} from './Context';
import type {Modifier} from './ModifierOthers';

export class InGameContext extends Context {
	private readonly location: Location;

	constructor(initialLocation: Location) {
		super('ingame');
		this.location = initialLocation;
	}

	getContextualValue(modifier: Modifier): number {
		if (modifier.condition && !modifier?.condition.verify(this)) {
			return 0;
		}

		return modifier.value;
	}

	getCurrentLocation(): Location {
		return this.location;
	}
}
