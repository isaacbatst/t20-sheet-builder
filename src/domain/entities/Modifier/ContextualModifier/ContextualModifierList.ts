import {type ContextInterface} from '../../Context';
import type {Attributes} from '../../Sheet/Attributes';
import {type SheetInterface} from '../../Sheet/SheetInterface';
import {type SerializedModifier} from '../ModifierInterface';
import {ModifiersList} from '../ModifiersList';
import {ContextualModifierAppliableValueCalculator} from './ContextualModifierAppliableValueCalculator';
import type {ContextualModifierInterface} from './ContextualModifierInterface';
import type {ContextualModifiersListInterface} from './ContextualModifiersListInterface';

export class ContextualModifiersList
	extends ModifiersList <ContextualModifierInterface>
	implements ContextualModifiersListInterface {
	override serialize(sheet: SheetInterface, context: ContextInterface): SerializedModifier[] {
		const attributes = sheet.getSheetAttributes().getValues();
		return this.modifiers.map(modifier => {
			const appliableValueCalculator = new ContextualModifierAppliableValueCalculator(attributes, context, modifier);
			return modifier.serialize(appliableValueCalculator, attributes);
		});
	}

	getMaxTotal(attributes: Attributes): number {
		return this.modifiers.reduce((acc, modifier) => modifier.baseValue + modifier.getTotalAttributeBonuses(attributes) + acc, 0);
	}
}
