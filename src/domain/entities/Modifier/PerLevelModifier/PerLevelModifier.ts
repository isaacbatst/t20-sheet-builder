import type {Attribute} from '../../Sheet/Attributes';
import type {TranslatableName} from '../../Translator';
import {Modifier} from '../Modifier';
import type {PerLevelModifierInterface} from './PerLevelModifierInterface';

export class PerLevelModifier extends Modifier implements PerLevelModifierInterface {
	constructor(
		source: TranslatableName,
		value: number,
		readonly includeFirstLevel: boolean = true,
		attributeBonuses = new Set<Attribute>(),
		readonly frequency = 1,
	) {
		super(source, value, 'perLevel', attributeBonuses);
	}

	getPerLevelValue(): number {
		return this.value;
	}
}
