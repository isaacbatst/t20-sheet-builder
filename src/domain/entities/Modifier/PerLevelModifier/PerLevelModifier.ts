import type {Attribute} from '../../Attributes';
import type {Translatable} from '../../Translator';
import {Modifier} from '../Modifier';
import type {PerLevelModifierInterface} from './PerLevelModifierInterface';

export class PerLevelModifier extends Modifier implements PerLevelModifierInterface {
	constructor(
		source: Translatable,
		value: number,
		readonly includeFirstLevel: boolean = true,
		attributeBonuses: Set<Attribute> = new Set(),
	) {
		super(source, value, 'perLevel', attributeBonuses);
	}

	getPerLevelValue(): number {
		return this.value;
	}
}
