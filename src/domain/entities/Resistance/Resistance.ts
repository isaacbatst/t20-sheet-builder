import {type SerializedSheetModifiersList, type ContextInterface, type TranslatableName} from '..';
import {FixedModifier, FixedModifiersList, FixedModifiersListTotalCalculator} from '../Modifier';
import {type Attributes} from '../Sheet/Attributes';
import {type SheetInterface} from '../Sheet/SheetInterface';
import {type ResistanceName} from './ResistanceName';

export type SerializedResistance = {
	resisted: ResistanceName;
	fixedModifiers: SerializedSheetModifiersList;
	source: TranslatableName;
};

export class Resistance {
	readonly source: TranslatableName;
	readonly resisted: ResistanceName;
	private readonly fixedModifiers: FixedModifiersList;

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

	serialize(sheet: SheetInterface, context: ContextInterface): SerializedResistance {
		return {
			resisted: this.resisted,
			fixedModifiers: this.fixedModifiers.serialize(sheet, context),
			source: this.source,
		};
	}
}
