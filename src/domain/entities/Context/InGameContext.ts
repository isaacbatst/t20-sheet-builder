import type {Character} from '../Character/Character';
import type {Location} from '../Sheet/CharacterSheet/CharacterSheetInterface';
import {type SheetInterface} from '../Sheet/SheetInterface';
import {Context} from './Context';

export class InGameContext extends Context {
	override activateContextualModifiers = true;
	private readonly location: Location;

	constructor(
		initialLocation: Location,
		readonly sheet: SheetInterface,
	) {
		super();
		this.location = initialLocation;
	}

	override getCurrentLocation(): Location {
		return this.location;
	}
}
