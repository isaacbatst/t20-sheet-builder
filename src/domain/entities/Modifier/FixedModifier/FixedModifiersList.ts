import {type ContextInterface} from '../../Context';
import {type SerializedSheetModifiersList} from '../../Sheet/SerializedSheet/SerializedSheetInterface';
import {type SheetInterface} from '../../Sheet/SheetInterface';
import {ModifiersList} from '../ModifiersList';
import type {ModifiersListInterface} from '../ModifiersListInterface';
import type {FixedModifierInterface} from './FixedModifier';
import {FixedModifierAppliableValueCalculator} from './FixedModifierAppliableValueCalculator';
import {FixedModifiersListTotalCalculator} from './FixedModifiersListTotalCalculator';

export type FixedModifiersListInterface = ModifiersListInterface<FixedModifierInterface>;

export class FixedModifiersList extends ModifiersList<FixedModifierInterface>
	implements ModifiersListInterface<FixedModifierInterface> {
	override serialize(sheet: SheetInterface, _context: ContextInterface): SerializedSheetModifiersList {
		const attributes = sheet.getSheetAttributes().getValues();
		const appliableValueCalculator = new FixedModifierAppliableValueCalculator(attributes);
		const modifiers = this.modifiers.map(modifier => modifier.serialize(appliableValueCalculator, attributes));
		const totalCalculator = new FixedModifiersListTotalCalculator(attributes);
		return {
			modifiers,
			total: this.getTotal(totalCalculator),
		};
	}
}
