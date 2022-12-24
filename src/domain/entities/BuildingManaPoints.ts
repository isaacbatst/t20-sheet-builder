import type {ContextInterface} from './Context';
import {ManaPoints} from './ManaPoints';
import {ModifiersList} from './ModifierList';

export class BuildingManaPoints {
	readonly modifiers: ModifiersList = new ModifiersList();

	getTotal(context: ContextInterface) {
		return this.modifiers.getTotal(context);
	}
}
