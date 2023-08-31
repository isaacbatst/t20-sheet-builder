import {type SerializedSheetContextualModifiersList} from '../..';
import {type Context} from '../../Context';
import type {Attributes} from '../../Sheet/Attributes';
import {type SheetInterface} from '../../Sheet/SheetInterface';
import {ModifiersList} from '../ModifiersList';
import {ContextualModifierAppliableValueCalculator} from './ContextualModifierAppliableValueCalculator';
import type {ContextualModifierInterface} from './ContextualModifierInterface';
import type {ContextualModifiersListInterface} from './ContextualModifiersListInterface';
import {ContextualModifiersListTotalCalculator} from './ContextualModifiersListTotalCalculator';

export class ContextualModifiersList
	extends ModifiersList <ContextualModifierInterface>
	implements ContextualModifiersListInterface {
	override serialize(sheet: SheetInterface, context: Context): SerializedSheetContextualModifiersList {
		const attributes = sheet.getSheetAttributes().getValues();
		const totalCalculator = new ContextualModifiersListTotalCalculator(context, attributes);
		return {
			modifiers: this.modifiers.map(modifier => {
				const calculator = new ContextualModifierAppliableValueCalculator(attributes, context, modifier);
				return modifier.serialize(calculator, attributes);
			}),
			total: this.getTotal(totalCalculator),
			maxTotal: this.getMaxTotal(attributes),
		};
	}

	getMaxTotal(attributes: Attributes): number {
		return this.modifiers.reduce((acc, modifier) => modifier.baseValue + modifier.getTotalAttributeBonuses(attributes) + acc, 0);
	}
}
