import type {FixedModifierInterface} from './FixedModifier';
import {ModifiersList} from '../ModifiersList';
import type {ModifiersListInterface} from '../ModifiersListInterface';
import {type ContextInterface} from '../../Context';
import {type SheetInterface} from '../../Sheet/SheetInterface';
import {type SerializedModifier} from '../ModifierInterface';
import {FixedModifierAppliableValueCalculator} from './FixedModifierAppliableValueCalculator';

export type FixedModifiersListInterface = ModifiersListInterface<FixedModifierInterface>;

export class FixedModifiersList extends ModifiersList<FixedModifierInterface>
	implements ModifiersListInterface<FixedModifierInterface> {
	override serialize(sheet: SheetInterface, _context: ContextInterface): SerializedModifier[] {
		const appliableValueCalculator = new FixedModifierAppliableValueCalculator(sheet.getSheetAttributes().getValues());
		return this.modifiers.map(modifier => modifier.serialize(appliableValueCalculator, sheet.getSheetAttributes().getValues()));
	}
}
