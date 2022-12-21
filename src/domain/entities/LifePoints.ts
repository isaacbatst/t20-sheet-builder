import type {ModifierInterface} from './ModifierList';
import {ModifiersList} from './ModifierList';

export class LifePoints {
	static get initialValue() {
		return 0;
	}

	private static get repeatedModifierError() {
		return 'REPEATED_LIFE_POINTS_MODIFIER';
	}

	readonly modifiers: ModifiersList = new ModifiersList(LifePoints.repeatedModifierError);

	addModifier(modifier: ModifierInterface) {
		this.modifiers.add(modifier);
	}
}
