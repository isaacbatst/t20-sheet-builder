import {Context} from './Context';
import type {InGameContextInterface} from './Context/InGameContextInterface';
import type {ModifierConditionVerify} from './Modifier/ContextualModifier/ContextualModifiersListInterface';
import type {Location} from './Sheet/SheetInterface';

export class InGameContext extends Context implements InGameContextInterface {
	private readonly location: Location;

	constructor(initialLocation: Location) {
		super('ingame', true);
		this.location = initialLocation;
	}

	shouldActivateModifier(verify: ModifierConditionVerify): boolean {
		return verify(this);
	}

	getCurrentLocation(): Location {
		return this.location;
	}
}
