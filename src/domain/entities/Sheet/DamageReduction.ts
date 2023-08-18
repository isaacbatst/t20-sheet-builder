import {type ContextInterface, type SerializedSheetModifiersList} from '..';
import {type DamageType} from '../Damage/DamageType';
import {FixedModifiersList} from '../Modifier';
import {type SheetInterface} from './SheetInterface';

export type SerializedDamageReduction = {
	type: DamageType;
	modifiers: SerializedSheetModifiersList;
};

export class DamageReduction {
	constructor(
		readonly type: DamageType,
		readonly modifiers = new FixedModifiersList(),
	) {}

	serialize(sheet: SheetInterface, context: ContextInterface) {
		return {
			type: this.type,
			modifiers: this.modifiers.serialize(sheet, context),
		};
	}
}
