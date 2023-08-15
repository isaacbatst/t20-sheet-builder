import {FixedModifier, FixedModifiersList, FixedModifiersListTotalCalculator} from '../Modifier';
import {type ResistanceName} from './ResistanceName';
import {type Attributes} from '../Sheet/Attributes';
import {type TranslatableName} from '..';

export class Resistance {
	private readonly resisted: ResistanceName;
	private readonly fixedModifiers: FixedModifiersList;
	private readonly source: TranslatableName;

	constructor(resistance: ResistanceName, value: number, source: TranslatableName) {
		this.resisted = resistance;
		this.fixedModifiers = new FixedModifiersList();
		this.fixedModifiers.add(new FixedModifier(this.resisted, value));
		this.source = source;
	}

	getTotal(attributes: Attributes) {
		const calculator = new FixedModifiersListTotalCalculator(attributes);
		return this.fixedModifiers.getTotal(calculator);
	}
}
